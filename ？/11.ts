let reflect=<P>(param:P)=>{
    return param
}

const reflectFn:<p>(param:p)=>p=reflect

type ReflectFunction =<P>(param:P)=>P
interface IReflectFunction{
    <P>(param:P):P
}

const ref2:ReflectFunction=reflect
const ref3:IReflectFunction=reflect


type StringOrNumberArray<E>=E extends string|number?E[]:E
type a=StringOrNumberArray<string>



type BooleanOrString = string | boolean;
type WhatIsThis = StringOrNumberArray<BooleanOrString>; // 好像应该是 string | boolean ?
type BooleanOrStringGot = BooleanOrString extends string | number ? BooleanOrString[] : BooleanOrString; //  string | boolean
