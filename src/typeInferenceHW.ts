// Вам потрібно створити тип DeepReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів.
type DeepReadonly<T> = {
    readonly [K in keyof T]: T[K] extends object ? DeepReadonly<T[K]> : T[K];
};
// Вам потрібно створити тип DeepRequireReadonly який буде робити доступними тільки для читання навіть властивості вкладених обʼєктів та ще й робити їх обовʼязковими.
type DeepRequireReadonly<T> = {
    readonly [K in keyof T]-?: T[K] extends object ? DeepRequireReadonly<T[K]> : T[K];
};
// Вам потрібно створити тип UpperCaseKeys, який буде приводити всі ключі до верхнього регістру.
type UpperCaseKeys<T> = {
    [K in keyof T & string as Capitalize<K>]: T[K]
}
// І саме цікаве. Створіть тип ObjectToPropertyDescriptor, який перетворює звичайний 
// обʼєкт на обʼєкт де кожне value є дескриптором.
type ObjectToPropertyDescriptor<T> = {
    [K in keyof T]: PropertyDescriptor;
};

interface IUser {
    name:string | object;
    age:number
    isMarried:boolean
};
 let a: DeepReadonly<IUser> = {name:{name:'',age:1,isMarried:true},age:1,isMarried:true};
 a.name.name=2;
 let b: DeepRequireReadonly<IUser> = {name:{name:'',age:1},age:1,isMarried:true};
 let c: UpperCaseKeys<IUser> = {Name:'',Age:1,IsMarried:true}

