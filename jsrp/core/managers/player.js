log("[PlayerManager]");

class PlayerManager {
    constructor() {
        this.players = new Map();
    }
    addPlayer(player) {
        this.players.set(player.license, player);
    }
    removePlayer(player) {
        this.players.delete(player.license);
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
    const pc = new PlayerController(player)
    $lib.Players.addPlayer({
        license: pc.license(),
        source: pc.src(),
        ped: pc.ped()
    })
    log("[playerManager][playerJoining]", source, player)
})

on("playerDropped", async (reason) => {
    const player = $lib.Players.getPlayerBySrc(global.source);
    $lib.Players.removePlayer(player)
    log("[playerManager][playerDropped]", player, reason)
})

/*
    todo:
        replace players on restart resource
*/
function onResourceStop(resource) {
    if (resource !== GetCurrentResourceName()) {
      return;
    }
    log("----------")
    log(GetNumPlayerIndices())
}
on("resourceStop", onResourceStop) 