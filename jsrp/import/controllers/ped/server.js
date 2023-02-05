log("[PedController]");

class PedController{
    constructor(pedId){
        this.id = pedId
    }
    getHealth(percent = false){
        return GetEntityHealth(this.id) - (percent?100:0)
    }
    getMaxHealth(percent = false){
        return GetEntityMaxHealth(this.id) - (percent?100:0)
    }
    getArmour(){
        return GetPedArmour(this.id)
    }
    setArmour(amount){
        SetPedArmour(this.id, amount)
    }
    removeAllWeapons(){
        RemoveAllPedWeapons(this.id, true)
    }
    giveWeapon(weaponName='weapon_pistol_mk2', ammoCount=1, isHidden=false, bForceInHand=false ){
        GiveWeaponToPed(this.id, GetHashKey(weaponName), ammoCount, isHidden, bForceInHand)
    }
    setPosition(x, y, z) {
        SetEntityCoords(
            this.id,
            x,
            y,
            z,
            true,
            false,
            false,
            true
        );
    }
    getPosition(){
        return GetEntityCoords(this.id)
    }
}

$lib.PedController = PedController
$lib.Ped = $exportClass(PedController);
