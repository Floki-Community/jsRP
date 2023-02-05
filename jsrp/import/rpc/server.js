const rpcEvents = []

$lib.rpc = (source, method, params = []) =>{
    console.log("[RPC] " + source + " " + method);
    return new Promise((resolve) => {
        let time = Date.now() //prevent duplicated responses
        emitNet(`jsrp:rpc`, source, [{
            method,
            params,
            time
        }]);
        onNet(`jsrp:rpc:${source}:${method}:${time}:response`, (res) => {
            console.log(`[RPC] ${source} ${method} ${Date.now()-time}ms DONE`);
            resolve(res);
        });
        setTimeout(()=>{
            resolve(false)
        },3000)
    });
}