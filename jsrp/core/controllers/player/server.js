log("[PlayerController]");
/*
    TODO: GetCurrentResourceName on constructor
*/
class PlayerController extends PedController{
    constructor(playerSrc) {
        super(GetPlayerPed(playerSrc))
        this.playerSrc = playerSrc
    }
    async RPC(method, ...args){
        return await $lib.RPC(this.playerSrc, method, args)
    }
    emit(resource, action, ...args) {
        emitNet(`${resource}:${action}`, this.src(), args)
    }
    setBucket(n) {
        SetPlayerRoutingBucket(this.playerSrc, n);
    }
    getBucket() {
        return GetPlayerRoutingBucket(this.playerSrc);
    }
    getMaxArmour(){
        return GetPlayerMaxArmour(this.playerSrc)
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
    license(key = "license2") {
        return this.identifiers()[key];
    }
    nId() {
        return NetworkGetNetworkIdFromEntity(this.ped());
    }
    eId() {
        return NetworkGetEntityFromNetworkId(this.nId());
    }
}

$lib.Player = $exportClass(PlayerController);