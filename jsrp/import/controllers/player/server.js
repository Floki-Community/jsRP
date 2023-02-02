log("[PlayerController]");

class PlayerController {
    constructor(playerSrc) {
        this.playerSrc = playerSrc
    }
    emit(resource, action, ...args) {
        emitNet(`${resource}:${action}`, this.src(), args)
    }
    setBucket(n) {
        SetPlayerRoutingBucket(this.playerSrc, n);
    }
    getBucket() {
        GetPlayerRoutingBucket(this.playerSrc);
    }
    identifiers() {
        return $lib.parseIdentifiers(this.playerSrc);
    }
    src() {
        return this.playerSrc;
    }
    ped() {
        return GetPlayerPed(this.playerSrc);
    }
    lisence(key = "license2") {
        return this.identifiers()[key];
    }
    nId() {
        return NetworkGetNetworkIdFromEntity(this.ped());
    }
    eId() {
        return NetworkGetEntityFromNetworkId(this.nId());
    }
}

$lib.PlayerController = PlayerController

$lib.Player = $exportClass(PlayerController);