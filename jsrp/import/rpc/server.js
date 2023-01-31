$lib.rpc = (source, method, params = []) =>{
    console.log("[RPC] " + source + " " + method);
    return new Promise((resolve) => {
        emitNet(`jsrp:rpc`, source, [{
            method,
            params
        }]);
        onNet(`jsrp:rpc:${source}:${method}:response`, (res) => {
            console.log(`[RPC] ${source} ${method} DONE`);
            resolve(res);
        });
        setTimeout(()=>{
            resolve(false)
        },3000)
    });
}