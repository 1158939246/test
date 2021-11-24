class myRequest {
    private loggedOn: boolean
    private frequentOk: boolean
    private Permits: boolean
    private containSensitiveWords: boolean

    private constructor(loggedOn: boolean, frequentOk: boolean, isPermits: boolean, containSensitiveWords: boolean) {
        this.loggedOn = loggedOn
        this.frequentOk = frequentOk
        this.Permits = isPermits
        this.containSensitiveWords = containSensitiveWords
    }

    static RequestBuilder = class RequestBuilder {
        private loggedOn: boolean
        private frequentOk: boolean
        private Permits: boolean
        private containSensitiveWords: boolean

        setLoggedOn(loggedOn: boolean): RequestBuilder {
            this.loggedOn = loggedOn
            return this
        }

        setFrequentOk(frequentOk: boolean): RequestBuilder {
            this.frequentOk = frequentOk
            return this
        }
        setPermits(Permits: boolean): RequestBuilder {
            this.Permits = Permits
            return this
        }
        setContainSensitiveWords(containSensitiveWords: boolean): RequestBuilder {
            this.containSensitiveWords = containSensitiveWords
            return this
        }
        
        constructor(){
            this.loggedOn=false
            this.frequentOk=false
            this.Permits=false
            this.containSensitiveWords=false
        }

        public build(): myRequest {
            let request: myRequest = new myRequest(this.loggedOn, this.frequentOk, this.Permits, this.containSensitiveWords)
            return request
        }
    }

    public isLoggedOn(): boolean {
        return this.loggedOn
    }

    public isFrequentOk(): boolean {
        return this.frequentOk
    }
    public isPermits(): boolean {
        return this.Permits
    }
    public isContainSensitiveWords(): boolean {
        return this.containSensitiveWords
    }
}

abstract class Handler {
    _next: Handler|null
    public constructor(next?: Handler|null) {
        this._next = next?next:null
    }
    public getNext() {
        return this._next
    }
    public setNext(next: Handler) {
        this._next = next
        return this._next
    }

    abstract process(request: myRequest): boolean

}

class RequestFrequentHandler extends Handler {
    process(request: myRequest): boolean {
        console.log("访问频率控制")
        if (request.isFrequentOk()) {
            let next = this.getNext()
            if (next == null) {
                return true
            }
            if (!next.process(request)) {
                return false
            } else {
                return true
            }
        }
        return false
    }
}

class LoginHandler extends Handler {
    process(request: myRequest): boolean {
        console.log("登入验证")
        if (request.isLoggedOn()) {
            let next = this.getNext()
            if (next == null) {
                return true
            }
            if (!next.process(request)) {
                return false
            } else {
                return true
            }
        }
        return false
    }
}

class permitHandler extends Handler {
    process(request: myRequest): boolean {
        console.log("身份权限验证")
        if (request.isPermits()) {
            let next = this.getNext()
            if (next == null) {
                return true
            }
            if (!next.process(request)) {
                return false
            } else {
                return true
            }
        }
        return false
    }
}

let req=new myRequest.RequestBuilder().setFrequentOk(false).setLoggedOn(true).setPermits(true).build()

let reqHandler=new RequestFrequentHandler()
    reqHandler.setNext(new LoginHandler()).setNext(new permitHandler())

if(reqHandler.process(req)){
    console.log('ok')
}else{
    console.log('error')
}