log("[PlayerController]");
/*
    TODO: GetCurrentResourceName on constructor
*/
class PlayerController extends PedController{
    constructor(playerSrc) {
        super(GetPlayerPed(playerSrc))
        this.playerSrc = playerSrc
    }
    async rpc(method, ...args){
        return await $lib.rpc(this.playerSrc, method, args)
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