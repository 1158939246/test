
class Subject {
    //容器
    private container: Observer[] = []
    //add
    public addObserver(observer: Observer): void {
        this.container.push(observer)
    }
    //remove
    public remove(observer: Observer): void {
        this.container.splice(this.container.indexOf(observer), 1)
    }

    public notifyObserver(_object: Object): void {
        this.container.forEach((item) => {
            item.update(Object)
        })
    }
}

interface Observer {
    update(object: Object): void
}

class Task1 implements Observer {
    update(object: Object): void {
        console.log(1)
        console.log(object)
    }
}

class Task2 implements Observer {
    update(object: Object): void {
        console.log(2)
        console.log(object)
    }
}

class Task3 implements Observer {
    update(object: Object): void {
        console.log(3)
        console.log(object)
    }
}

let subject = new Subject()
let task1 = new Task1()
let task2 = new Task2()
let task3 = new Task3()

subject.addObserver(task1)
subject.addObserver(task2)
subject.addObserver(task3)

subject.remove(task2)

subject.notifyObserver({ a: 4 })


