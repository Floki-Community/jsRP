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
        let ids = $lib.parseIdentifiers(src)
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
    console.log("[playerManager][playerJoining]", source, player)
})

on("playerDropped", async (reason) => {
    const player = $lib.Players.getPlayerBySrc(global.source);
    $lib.Players.removePlayer(player)
    console.log("[playerManager][playerDropped]", player, reason)
})

/*
    todo:
        replace players on restart resource
*/
function onResourceStop(resource) {
    if (resource !== GetCurrentResourceName()) {
      return;
    }
    console.log("----------")
    console.log(GetNumPlayerIndices())
}
on("resourceStop", onResourceStop) 