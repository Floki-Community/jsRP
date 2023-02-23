const response = (source, resource, action, args = [], ts) => {
    let event = `${resource}:${action}:response`;
    log("[RES] " + source + " " + event);
    emitNet(event, source, {
        data: args,
        id: ts
    });
};
$lib.response = response

const requestList = {}

$lib.onRequest = (name, action, cb) => {
    let event = `${name}:${action}`;
    if (requestList[event]) {
        log("[REQ] OLD " + event);
        requestList[event] = cb
    } else {
        log("[REQ] NEW " + event);
        requestList[event] = cb
        onNet(event, async (data) => {
            let { source, args, ts } = data
            let res = await requestList[event](source, args);
            log("[REQ] " + source + " " + event);
            response(source, name, action, res, ts);
        });
    }
};

