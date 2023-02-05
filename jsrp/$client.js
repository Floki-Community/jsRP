const resource = GetCurrentResourceName()
const $ = exports['jsrp'].$()

const $request = (action, args = []) => {
    return $.request(resource, action, args)
}

const $on = (method, cb)=>{
    onNet(`${resource}:${method}`, (args) => cb(...args));
}

console.log(`[jsrp] ${resource} injected`)