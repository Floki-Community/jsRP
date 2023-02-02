log("[PlayerManager]");

class PlayerManager {
    constructor() {
        this.players = new Map();
    }
    addPlayer(player) {
        this.players.set(player.lisence, player);
    }
    removePlayer(player) {
        this.players.delete(player.lisence);
    }
    getPlayerBySrc(src) {
        let ids = $.parseIdentifiers(src)
        return this.players.get(ids.license2);
    }
    getPlayerById(id) {
        return this.players.get(id);
    }
    getPlayers() {
        return Array.from(this.players.values());
    }
}

$loadClass("Players", PlayerManager);

on("playerJoining", async (source, oldID) => {
    const player = global.source;
    const pc = new $lib.PlayerController(player)
    $lib.Players.addPlayer({
        lisence: pc.lisence(),
        source: pc.src(),
        ped: pc.ped()
    })
    console.log("[playerManager][playerJoining] ", source, player)
})

on("playerDropped", async (reason) => {
    const player = $lib.Players.getPlayerBySrc(global.source);
    console.log("playerDropped", player, reason)
    $lib.Players.removePlayer(player)
})
