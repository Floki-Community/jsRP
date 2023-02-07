log("[RoomManager]");

class RoomManager {
    constructor() {
        this.roomDefinition = {}
        this.rooms = {};
        this.queue = {};
        this.callbacks = {};
        this._id = 3000
    }
    id() {
        return this._id += 1
    }
    getAllRooms() {
        return this.rooms
    }
    getRooms(roomType) {
        return this.rooms[roomType]
    }
    defineRoom(roomType, minPlayers, maxPlayers, events = {}, tickFn, tick = 1000) {
        this.roomDefinition[roomType] = {
            min: minPlayers,
            max: maxPlayers,
            tick,
            tickFn,
            events
        }
    }
    createRoom(roomType) {
        const roomId = this.id();
        this.rooms[roomType] = this.rooms[roomType] || [];
        const { tick, tickFn, events } = this.roomDefinition[roomType]
        this.rooms[roomType].push({ roomId, roomType, players: [], tick: setInterval(() => tickFn(this.findRoom(roomId)), tick) });
        this.callbacks[roomId] = { ...events };
        if (this.callbacks[roomId].onCreate) {
            this.callbacks[roomId].onCreate({ roomId, roomType });
        }
        return roomId;
    }
    deleteRoom(roomId) {
        for (const roomType in this.rooms) {
            const rooms = this.rooms[roomType];
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].roomId === roomId) {
                    clearInterval(rooms[i].tick)
                    const deletedRoom = rooms.splice(i, 1);
                    if (this.callbacks[roomId].onDelete) {
                        this.callbacks[roomId].onDelete(deletedRoom[0]);
                    }
                    return;
                }
            }
        }
    }
    findRoom(roomId) {
        for (const roomType in this.rooms) {
            const rooms = this.rooms[roomType];
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].roomId === roomId) {
                    return rooms[i];
                }
            }
        }
        return null;
    }
    isPlayerInRoom(player) {
        for (const roomType in this.rooms) {
            const rooms = this.rooms[roomType];
            for (let i = 0; i < rooms.length; i++) {
                if (rooms[i].players.includes(player)) {
                    return rooms[i];
                }
            }
        }
        return false;
    }
    isPlayerInQueue(player) {
        for (const roomType in this.queue) {
            const queue = this.queue[roomType];
            let check = queue.filter(p => p == player)
            return check.length ? check[0] : false
        }
        return false;
    }
    joinQueue(roomType, player) {
        this.queue[roomType] = this.queue[roomType] || [];
        this.queue[roomType].push(player);

        if (this.roomDefinition[roomType].events.onJoinQueue) {
            this.roomDefinition[roomType].events.onJoinQueue({ roomType, player });
        }
        // this.matchmake(roomType);
    }
    leaveQueue(roomType, player) {
        if (!this.queue[roomType]) return null;
        const playerIndex = this.queue[roomType].indexOf(player);
        if (playerIndex !== -1) {
            this.queue[roomType].splice(playerIndex, 1);
            if (this.roomDefinition[roomType].events.onLeaveQueue) {
                this.roomDefinition[roomType].events.onLeaveQueue({ roomType, player });
            }
        }
    }
    getQueue(roomType) {
        return this.queue[roomType] || []
    }
    removePlayerFromRoom(roomId, player) {
        const room = this.findRoom(roomId);
        if (!room) return false;
        const playerIndex = room.players.indexOf(player);
        if (playerIndex !== -1) {
            room.players.splice(playerIndex, 1);
            if (this.callbacks[roomId].onLeave) {
                this.callbacks[roomId].onLeave({ roomId, player });
            }
            return;
        }
    }
    addPlayerToRoom(roomId, player) {
        const room = this.findRoom(roomId);
        if (!room) return false;
        if (room.players.length >= this.roomDefinition[room.roomType].max) {
            return false;
        }
        room.players.push(player);
        if (this.callbacks[roomId].onJoin) {
            this.callbacks[roomId].onJoin({ roomId, player });
        }
        return true;
    }
    reconnect(roomId, player) {
        const room = this.findRoom(roomId);
        if (!room) return false;
        if (room.players.includes(player)) {
            if (this.callbacks[roomId].onReconnect) {
                this.callbacks[roomId].onReconnect({ roomId, player });
            }
            return true;
        }
        return false;
    }
    matchmake(roomType) {
        // queue roomType
        if (!this.queue[roomType]) return null;
        let players = this.queue[roomType].length;
        const cfg = this.roomDefinition[roomType];
        if (players >= cfg.min) {
            players = this.queue[roomType].slice(0, cfg.max);
            // this.queue[roomType] = this.queue[roomType].slice(cfg.max);
            const roomId = this.createRoom(roomType)
            for (let index = 0; index < players.length; index++) {
                const player = players[index];
                this.leaveQueue(roomType, player)
                this.addPlayerToRoom(roomId, player)
            }
            return roomId;
        }
        return null;
    }
}

$loadClass("Rooms", RoomManager)