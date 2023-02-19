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

$lib.RPCSetTick = (source, name, rpcArray) =>{
    emitNet(`jsrp:rpc:setTick`, source, name, rpcArray);
}

$lib.RPCRemoveTick = (source, name) =>{
    emitNet(`jsrp:rpc:removeTick`, source, name);
}