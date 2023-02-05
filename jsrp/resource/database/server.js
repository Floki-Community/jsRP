class Database {
    constructor() {
        this.data = {};
        this.prefix = ""
    }
    init(prefix = ""){
        this.prefix = prefix == ""? "" : prefix+":"
    }
    set(key, value) {
        this.data[this.prefix+key] = value;
        return this.get(key)
    }
    get(key) {
        return this.data[this.prefix+key] || false;
    }
    getAll(){
        let res = {}
        for (const data in this.data) {
            if(data.includes(this.prefix))
                res[data.split(":")[1]] = this.data[data]
        }
        return res
    }
    delete(key) {
        delete this.data[this.prefix+key];
    }
    drop(){
        for (const data in this.data) {
            if(data.includes(this.prefix))
                delete this.data[data];
        }
    }
}

$loadClass("Memory", Database)