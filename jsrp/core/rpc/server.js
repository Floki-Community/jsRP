$lib.RPC = (source, method, params = []) =>{
    return new Promise((resolve) => {
        let time = Date.now() //prevent duplicated responses
        emitNet(`jsrp:rpc`, source, [{
            method,
            params,
            time
        }]);
        onNet(`jsrp:rpc:${source}:${method}:${time}:response`, (res) => {
            resolve(res);
        });
        setTimeout(()=>{
            resolve(false)
        }, 3000)
    });
}

$lib.RPCSetTick = (resource, source, name, rpcArray) =>{
    emitNet(`${resource}:rpc:setTick`, source, name, rpcArray);
}

$lib.RPCRemoveTick = (resource, source, name) =>{
    emitNet(`${resource}:rpc:removeTick`, source, name);
}