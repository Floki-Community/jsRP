const resource = GetCurrentResourceName()
let $ = exports['jsrp'].$()
let $onLua = exports.jsrp.onLua

const $request = (action, args = []) => {
    return $.request(resource, action, args)
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