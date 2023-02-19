const ONCE = {}

const once = (name, check) => {
    if (!ONCE[name]) ONCE[name] = { trigger: false }
    if(check){
        if(!ONCE[name].trigger)
            return ONCE[name].trigger = true
    }else{
        if(ONCE[name].trigger)
            ONCE[name].trigger = false
    }
    return false
}

$lib.once = once