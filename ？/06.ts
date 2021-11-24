abstract class Adder{
    abstract x:number;
    abstract y:number;
    abstract add():number;
    displayName='Adder';
    addTwice():number{
        return (this.x+this.y)*2
    }
}

interface AdderI{
    x:number;
    y:number;
    add:()=>number;
}

class NumAdder implements AdderI{
     x:number;
     y:number;
    constructor(x:number,y:number){
        this.x=x
        this.y=y
    }
    add(){
        return this.x+this.y
    }
}

let numAdder=new NumAdder(2,3)
// console.log(numAdder.x);
// console.log(numAdder.y);
let a:NumAdder={x:1,y:2,add:function(){return this.x+this.y}}

// console.log(numAdder.add())

export default numAdder