function request(resource, action, args = []){
    let event = `${resource}:${action}`;
    const source = GetPlayerServerId(PlayerId());
    console.log(`[REQ] ${source} ${event}`);
    return new Promise((resolve) => {
        emitNet(event, {
            source: source,
            args: args,
        });
        onNet(`${event}:response`, (res) => {
            console.log(`[RES] ${source} ${event} DONE`);
            console.log(res)
            resolve(res);
        });
    });
};

$lib.request = request