onNet(`jsrp:rpc`, async (res) => {
    const source = GetPlayerServerId(PlayerId());
    const { method, params, time } = res[0];
    console.log(`[RPC] ${method}:${source} ${Date.now() - time}ms`);
    let response = await this[method](...params);
    emitNet(`jsrp:rpc:${source}:${method}:${time}:response`, response);
});