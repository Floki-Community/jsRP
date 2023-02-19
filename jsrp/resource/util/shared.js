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

$lib.distance = (x1, y1, x2, y2) => {
    let xDiff = x2 - x1;
    let yDiff = y2 - y1;
    return Math.sqrt(xDiff * xDiff + yDiff * yDiff);
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

$lib.keys = {
    "A": 34,
    "B": 29,
    "C": 26,
    "D": 9,
    "E": 38,
    "F": 23,
    "G": 47,
    "H": 74,
    "I": 0,
    "J": 0,
    "K": 311,
    "L": 182,
    "M": 244,
    "N": 249,
    "O": 0,
    "P": 199,
    "Q": 44,
    "R": 45,
    "S": 8,
    "T": 245,
    "U": 303,
    "V": 0,
    "W": 32,
    "X": 73,
    "Y": 246,
    "Z": 20,
    "BACKSPACE": 177,
    "CAPS": 137,
    "DELETE": 178,
    "DOWN": 173,
    "ENTER": 18,
    "ESC": 322,
    "F1": 288,
    "F10": 57,
    "F2": 289,
    "F3": 170,
    "F5": 166,
    "F6": 167,
    "F7": 168,
    "F8": 169,
    "F9": 56,
    "HOME": 213,
    "LEFT": 174,
    "LEFTALT": 19,
    "LEFTCTRL": 36,
    "LEFTSHIFT": 21,
    "PAGEDOWN": 11,
    "PAGEUP": 10,
    "RIGHT": 175,
    "RIGHTCTRL": 70,
    "SPACE": 22,
    "TAB": 37,
    "TOP": 27,
    "~": 243,
    "1": 157,
    "2": 158,
    "3": 160,
    "4": 164,
    "5": 165,
    "6": 159,
    "7": 161,
    "8": 162,
    "9": 163,
    "-": 84,
    "=": 83,
    "[": 39,
    "]": 40,
    ",": 82,
    ".": 81
};