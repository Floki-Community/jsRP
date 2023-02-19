onNet(`jsrp:rpc`, async (res) => {
    const source = GetPlayerServerId(PlayerId());
    const { method, params, time } = res[0];
    // console.log(`[RPC] ${method}:${source} ${Date.now() - time}ms`);
    let response = await this[method](...params);
    emitNet(`jsrp:rpc:${source}:${method}:${time}:response`, response);
});

const TICKS = {}

onNet(`jsrp:rpc:setTick`, async (name, rpcArray) => {
    const source = GetPlayerServerId(PlayerId());
    if(TICKS[name]){
        clearTick(TICKS[name])
    }
    TICKS[name] = setTick(()=>{
        for (let i = 0; i < rpcArray.length; i++) {
            const {method, params} = rpcArray[i];
            if(this[method])
                this[method](...params);
        }
    })
})

onNet(`jsrp:rpc:removeTick`, async (name) => {
    clearTick(TICKS[name])
})