function request(resource, action, args = []){
    let event = `${resource}:${action}`;
    const source = GetPlayerServerId(PlayerId());
    log(`[REQ] ${source} ${event}`);
    return new Promise((resolve) => {
        emitNet(event, {
            source: source,
            args: args,
        });
        onNet(`${event}:response`, (res) => {
            log(`[RES] ${source} ${event} DONE`);
            log(res)
            resolve(res);
        });
        setTimeout(()=>{
            resolve({
                error: true,
                message: 'timeout 3000ms'
            })
        }, 3000)
    });
};

$lib.request = request