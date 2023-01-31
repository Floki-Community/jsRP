$lib.delay = (ms) => new Promise((res) => setTimeout(res, ms));

$lib.short_uuid = () => {
    var dt = new Date().getTime();
    var uuid = 'xx4xyx-xx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

$lib.uuid = () => {
    var dt = new Date().getTime();
    var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return uuid;
}

$lib.randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;

$lib.arrayToVector3 = coords => {
    return {
        x: coords[0],
        y: coords[1],
        z: coords[2],
    }
}

$lib.getPedStats = () => {
    const playerPed = PlayerPedId();
    const health = GetEntityHealth(playerPed);
    const armor = GetPedArmour(playerPed);
    return [health, armor];
};

$lib.setPedStats = (health, armor) => {
    const playerPed = PlayerPedId();
    SetEntityHealth(playerPed, health);
    SetPedArmour(playerPed, armor);
};