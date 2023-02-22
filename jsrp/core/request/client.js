const responseList = {}

function request(resource, action, args = []){
    let event = `${resource}:${action}`;
    const source = GetPlayerServerId(PlayerId());
    log(`[REQ] ${source} ${event}`);
    return new Promise((resolve) => {
        emitNet(event, {
            source: source,
            args: args,
        });
        if (responseList[event]) {
            log("[RES] OLD " + event);
            responseList[event] = `${event}:response`
        } else {
            log("[RES] NEW " + event);
            responseList[event] = `${event}:response`
            onNet(`${event}:response`, (res) => {
                log(`[RES] ${source} ${event} DONE`);
                // responseList[event](source, args)
                resolve(res);
            });
        }
        setTimeout(()=>{
            resolve({
                error: true,
                message: 'timeout 3000ms'
            })
        }, 3000)
    });
};

$lib.request = request