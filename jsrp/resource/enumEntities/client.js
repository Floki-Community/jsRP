// https://github.com/Whit3XLightning/wld-delallveh/blob/master/client/entityiter.lua
function EnumerateEntities(initFunc, moveFunc, disposeFunc) {
    let list = []
    let [iter, id] = initFunc()
    if (!id || id == 0)
        return disposeFunc(iter)
    list.push(id)
    let next = true
    while (next) {
        let [n, id] = moveFunc(iter)
        if (n) list.push(id)
        next = n
    }
    disposeFunc(iter)
    return list
}

function EnumerateVehicles() {
    return EnumerateEntities(FindFirstVehicle, FindNextVehicle, EndFindVehicle)
}
$lib.EnumerateVehicles = EnumerateVehicles

function EnumeratePeds() {
    return EnumerateEntities(FindFirstPed, FindNextPed, EndFindPed)
}
$lib.EnumeratePeds = EnumeratePeds

function EnumerateVehicles() {
    return EnumerateEntities(FindFirstVehicle, FindNextVehicle, EndFindVehicle)
}
$lib.EnumerateVehicles = EnumerateVehicles

function EnumeratePickups() {
    return EnumerateEntities(FindFirstPickup, FindNextPickup, EndFindPickup)
}
$lib.EnumeratePickups = EnumeratePickups
