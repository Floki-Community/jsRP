onNet(`jsrp:rpc`, async (res) => {
    const source = GetPlayerServerId(PlayerId());
    const { method, params } = res[0];
    console.log(`[RPC] ${method}:${source}`);
    let response = await this[method](...params);
    emitNet(`jsrp:rpc:${source}:${method}:response`, response);
});
