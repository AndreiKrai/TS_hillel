// Conditional Types

function f (param:string):void {}
type ParamType<T>=T extends(p:infer U)=>void? U:undefined;

function fooA(p:number):void{};
let a1: ParamType<typeof fooA>;

type PType <T> = T extends {a:infer A, b: infer B}? A | B : undefined;
let a2: PType<{ a: number; b: string }>; // string | number

function f1 (param:string):string {return ''}

// Вам потрібно створити умовний тип, що служить для встановлення типу, що повертається з функції. 
// Як параметр типу повинен обов'язково виступати функціональний тип.  
type ParamType1<T>=T extends(p:any,q:any)=> infer U? U:never;

function int(a: number, b: string): string {
    return 'a * b';
}

let f3: ParamType1<typeof int>;

// Вам потрібно створити умовний тип, який приймає функціональний тип з одним параметром 
// (або задовільним) та повертає кортеж, де перше значення - це тип, що функція повертає, 
// а другий - тип її параметру.

type Type <T> = T extends (...param:infer P) =>infer U ? [U ,P]:never

let f2:Type<typeof int>;
