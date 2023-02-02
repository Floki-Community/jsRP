const $lib = {
    debug: true,
}

const log = (...args)=>{
    if($lib.debug) console.log(...args);
}

$lib.log = log

exports("$", ()=>{
    return {
        ...$lib
    }
});

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

const $loadClass = (name, clas, ...args) =>{
    if($lib[name]) return
    let list = getClassMethods(clas)
    $lib[`_${name}`] = new clas(...args)
    let c = $lib[`_${name}`]
    $lib[name] = {}
    for (let index = 0; index < list.length; index++) {
        const fn = list[index];
        $lib[name][fn] = (...args) => c[fn](...args)
    }
}

const $exportClass = (clas) =>{
    return (...args) =>{
        let p = new clas(...args)
        let l = getClassMethods(clas)
        let r = {}
        for (let i = 0; i < l.length; i++) {
            const fn = l[i];
            r[fn] = (...args) => p[fn](...args)
        }
        return r
    }
}