import { MyPromise } from "./myPromise";

let p1 = () => {
    return new MyPromise(function (resolve, reject) {
        setTimeout(() => {
            resolve('p1')
        }, 2000)
    })
}

let p2 = () => {
    return new MyPromise(function (resolve, reject) {
        resolve('p2')
        // reject('p2')
    })
}

// // MyPromise.all(['a','b',p1(),p2(),'c']).then(result=>console.log(result))
// p2().finally(() => {
//     console.log('asd')
//     return p1()
// }).then(value => {
//     console.log(value)
// }, reason => console.log(reason))

p2()
    .then(value => console.log(value))
    .catch(reason => console.log(reason))