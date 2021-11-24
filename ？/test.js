const person={
    name:'captain',
    say(){
        console.log(this.name)
    }
}

let fn=person.say
fn.apply(person)