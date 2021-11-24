// class StrategyTest {
//     public static main(): void {

//     }
// }

interface Moveable {
    move(): void
}

interface Attackable {
    attack(): void
}

// type Moveable = boolean
// type Attackable = boolean


abstract class Zombie {
    public abstract display(): void
    private _moveable: Moveable
    private _attackable: Attackable
    abstract move(): void
    abstract attack(): void

    constructor(moveable: Moveable, attackable: Attackable) {
        this._attackable = attackable
        this._moveable = moveable
    }

    public get moveable(): Moveable {
        return this._moveable
    }

    public set moveable(value: Moveable) {
        this._moveable = value
    }

    public get attackable(): Attackable {
        return this._attackable
    }

    public set attackable(value: Attackable) {
        this._attackable = value
    }

}

class StepByStepMove implements Moveable {
    move(): void {
        console.log("一步一步移动")
    }
}

class BiteAttack implements Attackable {
    attack(): void {
        console.log("咬");
    }
}

class FlogZombie extends Zombie {
    public display(): void {

        console.log("i an rider");

    }
    move(): void {
        this.moveable.move()
    }
    attack(): void {
        this.attackable.attack()
    }
    
    constructor()
    constructor(moveable: Moveable, attackable: Attackable)
    constructor(moveable?: Moveable, attackable?: Attackable){
        moveable&&attackable?
        super(moveable, attackable):
        super(new StepByStepMove(),new BiteAttack())
    }
}


class NormalZombie extends Zombie {
    public display(): void {
        console.log("i an normal zombie ");
    }
    move(): void {
        this.moveable.move()
    }
    attack(): void {
        this.attackable.attack()
    }

    constructor()
    constructor(moveable?: Moveable, attactable?: Attackable)
    constructor(moveable?: Moveable, attactable?: Attackable) {
        attactable&&moveable ? super(moveable, attactable) :
            super(new StepByStepMove(), new BiteAttack())
    }
}


let zombie:Zombie=new NormalZombie()
zombie.display()
zombie.attack()
zombie.move()

