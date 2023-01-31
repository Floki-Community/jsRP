$lib.RegisterNuiCallbacks = (object) =>{
    for (const key in object) {
        RegisterNuiCallbackType(key);
        on("__cfx_nui:" + key, object[key]);
    }
}