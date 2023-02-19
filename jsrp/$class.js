/*
    ☢ test zone
*/
function getClassMethods(className) {
    if (!className instanceof Object)
        throw new Error("Not a class");
    let ret = new Set();
    function methods(obj) {
        if (obj) {
            let ps = Object.getOwnPropertyNames(obj);
            ps.forEach(p => {
                if (obj[p] instanceof Function) {
                    ret.add(p);
                } else {
                    //can add properties if needed
                }
            });
            methods(Object.getPrototypeOf(obj));
        }
    }
    methods(className.prototype);
    return Array.from(ret);
}

const $lib = {}

const $loadClass = (name, clas, ...args) => {
    if ($[name]) return
    let list = getClassMethods(clas)
    let c = new clas(...args)
    $lib[name] = {}
    for (let index = 0; index < list.length; index++) {
        const fn = list[index];
        $lib[name][fn] = (...args) => c[fn](...args)
    }
    $exports(name, { ...$lib[name] })
}

const $exportClass = (name, clas) => {
    $exports(name, (...args) => {
        let p = new clas(...args)
        let l = getClassMethods(clas)
        let r = {}
        for (let i = 0; i < l.length; i++) {
            const fn = l[i];
            r[fn] = (...args) => p[fn](...args)
        }
        return r
    })
}