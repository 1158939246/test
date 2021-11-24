interface Person{
    name:string;
    say(this:Person):void;
}

const person:Person={
    name:'captain',
    say(){
        console.log(this.name)
    }
}

person.say()

