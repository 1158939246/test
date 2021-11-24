abstract class AbstractClass {
    
    /**
     * opreation 操作
     */
    public opreation():void {
        //open
        console.log("pre")
        //sql
        console.log("step1")
        console.log("step2")
        console.log("step3")
        //close
        this.templateMethod()
        console.log("step4")
    }

    
    protected abstract templateMethod():void

}

class SubClass1 extends AbstractClass{

    protected templateMethod(): void {
        console.log("subclass1 excude")
    }
    
}
class SubClass2 extends AbstractClass{

    protected templateMethod(): void {
        console.log("subclass2 excude")
    }
    
}

let abstractClass:AbstractClass=new SubClass2()

abstractClass.opreation()