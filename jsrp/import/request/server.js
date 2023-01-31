/*
    TO-DO:
    - remove duplicated requests on restart resource
        create a global constant to store callbacks by resource:name
        when restart, if callback key already exists on store, replace the callback function
*/

const response = (source, resource, action, args = []) => {
    let event = `${resource}:${action}:response`;
    // emitNet(event, -1, args);
    console.log("[RES] " + source + " " + event);
    emitNet(event, source, args);
};
$lib.response = response

$lib.onRequest = (name, action, cb) => {
    let event = `${name}:${action}`;
    onNet(event, (data) => {
        let { source, args } = data
        let res = cb(source, args);
        console.log("[REQ] " + source + " " + event);
        if (res instanceof Promise) {
            res.then((re) => {
                response(source, name, action, re);
            });
        } else {
            if (res != null) response(source, name, action, res);
        }
    });
};

