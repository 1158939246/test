interface Resolve {
    (res?: unknown): any
}

interface Reject {
    (res?: unknown): any
}

interface Executor {
    (resolve: Resolve, reject: Reject): any
}

interface Callback {
    (res?: unknown): any
}

const enum Status {
    pending,
    fullfilled,
    rejected
}

function resolvePromise(promise2: MyPromise, x: MyPromise | unknown, resolve: Resolve, reject: Reject) {

    if (promise2 === x) {
        return reject(new TypeError('circle detected'))
    }
    if (x instanceof MyPromise) {
        x.then(resolve, reject)
    } else {
        resolve(x)
    }
}


export class MyPromise {

    private value: unknown

    private reason: unknown

    private successCallback: Callback[] = []

    private failCallback: Callback[] = []

    private status: Status = Status.pending

    private resolve: Resolve = (res?: unknown) => {
        if (this.status !== Status.pending) return
        this.status = Status.fullfilled
        this.value = res
        while (this.successCallback.length) {
            let tmp = this.successCallback.shift()
            tmp && tmp(this.value)
        }
    }

    private reject: Reject = (res?: unknown) => {
        if (this.status !== Status.pending) return
        this.status = Status.rejected
        this.reason = res
        while (this.failCallback.length) {
            let tmp = this.failCallback.shift()
            tmp && tmp(this.reason)
        }
    }

    constructor(executor: Executor) {
        try {
            executor(this.resolve, this.reject)
        } catch (e) {
            this.reject(e)
        }
    }

    public then = (successCallback1?: Callback, failCallback1?: Callback): MyPromise => {
        let successCallback: Callback = successCallback1 ? successCallback1 : (value) => value
        let failCallback: Callback = failCallback1 ? failCallback1 : (reason) => { throw reason }
        let promise2 = new MyPromise((resolve, reject) => {
            switch (this.status) {
                case Status.fullfilled:
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                    break;
                case Status.rejected:
                    setTimeout(() => {
                        try {
                            let x = failCallback(this.reason);
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (e) {
                            reject(e);
                        }
                    }, 0)

                    break;
                case Status.pending: {
                    this.successCallback.push(() => {
                        setTimeout(() => {
                            try {
                                let x = successCallback(this.value);
                                resolvePromise(promise2, x, resolve, reject)
                            } catch (e) {
                                reject(e);
                            }
                        }, 0)
                    })
                    this.failCallback.push(() => {
                        setTimeout(() => {
                            try {
                                let x = failCallback(this.reason);
                                resolvePromise(promise2, x, resolve, reject)
                            } catch (e) {
                                reject(e);
                            }
                        }, 0)
                    })
                }; break;

            }
        })
        return promise2
    }

    public finally(callback: Callback) {
        return this.then(value => {
            return MyPromise.resolve(callback()).then(() => { return value })
        }, reason => {
            return MyPromise.resolve(callback()).then(() => { throw reason })
        })
    }

    public catch(failCallback:Callback){
        return this.then(undefined,failCallback)
    } 

    static all(array: unknown[]) {
        let result: any[] = []
        let index = 0


        return new MyPromise((resolve, reject) => {
            function addData(key: number, value: unknown) {
                result[key] = value
                index++
                if (index === array.length) {
                    resolve(result)
                }
            }
            array.forEach((ele, index) => {
                if (ele instanceof MyPromise) {
                    ele.then(value => addData(index, value), reason => reject(reason))
                } else {
                    addData(index, ele)
                }
            })
        })
    }

    static resolve(value: unknown) {
        if (value instanceof MyPromise) {
            return value
        }
        return new MyPromise((resolve, reject) => { resolve(value) })
    }


}