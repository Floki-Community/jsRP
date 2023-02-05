class NUI{
    constructor(playerSrc){
        this.playerSrc = playerSrc
    }
    rpc(action, ...args){
        emitNet(`jsrp:${action}`, this.playerSrc, args)
    }
    emit(data){
        this.rpc('emitNui', data)
    }
    addHTML(name, html){
        this.rpc('addHTML', name, html)
    }
    rmHTML(name){
        this.rpc('rmHTML', name)
    }
    setFocus(hasFocus, hasCursor){
        this.rpc('setFocus', hasFocus,hasCursor)
    }
}

$lib.Nui = $exportClass(NUI)