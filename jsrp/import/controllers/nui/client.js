$lib.registerCallbacks = (object) =>{
    for (const key in object) {
        RegisterNuiCallbackType(key);
        on("__cfx_nui:" + key, object[key]);
    }
}

$lib.emitNui = (data)=>{
    SendNUIMessage(data)
}

$lib.SetNuiFocus = (hasFocus,hasCursor) =>{
    SetNuiFocus(hasFocus,hasCursor)
}

let _on = (method, cb)=>{
    onNet(`jsrp:${method}`, (args) => cb(...args));
}

_on("emitNui", data =>{
    SendNUIMessage(data)
})

_on("setFocus", (hasFocus,hasCursor) =>{
    SetNuiFocus(hasFocus,hasCursor);
    // SetNuiFocusKeepInput(hasFocus)
});

_on('addHTML', (name, html)=>{
    $lib.emitNui({
        addHTML: {
            name,
            html 
        }
    })
});

_on('rmHTML', (name)=>{
    $lib.emitNui({
        rmHTML: {
            name
        }
    })
});