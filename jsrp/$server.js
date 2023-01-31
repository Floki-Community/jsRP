const resource = GetCurrentResourceName()
const $ = exports['jsrp'].$()

const $onRequest = (action, cb) =>{
    return $.onRequest(resource, action, cb)
}
const $emit = (source, method, ...args) =>{
    emitNet(`${resource}:${method}`, source, args)
}

console.log(`[jsrp] ${resource} injected`)