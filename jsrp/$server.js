const resource = GetCurrentResourceName()
const root = GetResourcePath(resource);
const __dirname = GetResourcePath(resource);

let $;
let $GetPlayers;
let $onLua;

const __load = () => {
    $ = exports.jsrp.$()
    $GetPlayers = exports.jsrp.GetPlayers
    $onLua = exports.jsrp.onLua
}
__load();

const $onRequest = (action, cb) => {
    return $.onRequest(resource, action, cb)
}

const $emit = (source, method, ...args) => {
    emitNet(`${resource}:${method}`, source, args)
}

const $exports = (name, fn) => {
    $.exports(name, fn)
    on("jsrp-ready", () =>{
        setImmediate(() => {
            $.exports(name, fn)
        })
    })
}

on("jsrp-ready", () => {
    setImmediate(() => {
        __load();
        console.log("[jsrp-ready] " + resource)
    })
})

console.log(`[jsrp] ${resource} injected`)