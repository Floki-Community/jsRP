const response = (source, resource, action, args = []) => {
    let event = `${resource}:${action}:response`;
    log("[RES] " + source + " " + event);
    emitNet(event, source, args);
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
        onNet(event, (data) => {
            let { source, args } = data
            let res = requestList[event](source, args);
            log("[REQ] " + source + " " + event);
            if (res instanceof Promise) {
                res.then((re) => {
                    response(source, name, action, re);
                });
            } else {
                if (res != null) response(source, name, action, res);
            }
        });
    }
};

