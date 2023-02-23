const resource = GetCurrentResourceName()
let $ = exports['jsrp'].$()
let $onLua = exports.jsrp.onLua

const TICKS = {}

onNet(`${resource}:rpc:setTick`, async (name, rpcArray) => {
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

onNet(`${resource}:rpc:removeTick`, async (name) => {
    clearTick(TICKS[name])
})

const $request = async (action, args = []) => {
    return await $.request(resource, action, args)
}

const $on = (method, cb)=>{
    onNet(`${resource}:${method}`, (args) => cb(...args));
}

const $exports = (name, fn) => {
    $.exports(name, fn)
    on("jsrp-ready", () =>{
        setImmediate(() => {
            $.exports(name, fn)
        })
    })
}

const __load = () => {
    $ = exports.jsrp.$()
    $onLua = exports.jsrp.onLua
}
__load();

on("jsrp-ready", () => {
    setImmediate(() => {
        __load();
        console.log("[jsrp-ready] " + resource)
    })
})

console.log(`[jsrp] ${resource} injected`)