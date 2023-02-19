const TIMERS = {}

const timer = (interval, name) => {
    if (!TIMERS[name]) TIMERS[name] = Date.now()
    if (Date.now() - TIMERS[name] >= interval) {
        TIMERS[name] = Date.now()
        return true
    }
    return false
}

$lib.timer = timer