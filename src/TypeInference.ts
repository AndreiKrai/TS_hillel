// type AliasType = { a: number; b: string };
// interface IAlias {
//   a: number;
//   b: string;
// }
// class Class {
//   a!: number;
//   b!: string;
// }
// const q: AliasType = { a: 1, b: 'sd' };
// let a: keyof AliasType; // 'a' | 'b'
// let b: keyof IAlias; // 'a' | 'b'
// let c: keyof Class; // 'a' | 'b'
// let d: keyof number; // 'toString' | 'toFixed' | 'toExponential' | 'toPrecision' | 'valueOf' | 'toLocaleString'
// // console.log(a)

// class Type {
//   public static fieldClass: number;//public static??
//   public publicField!: boolean;
//   protected protectedField!: string;
//   private privateField!: number;
//   public get property(): number {
//     return NaN;
//   }
//   public set property(value: number) {}
//   public constructor() {}
//   public static methodClass(): void {}
//   public instanceMethod(): void {}
// }
// let a1: keyof Type; // 'publicField' | 'property' | 'instanceMethod'

// //===================LOOKUP TYPES
// interface IUser {
//     name:string;
//     age:number
// }
// let userAge:IUser['age'];//number
// let userName:IUser['name'];//string
// let union:IUser['age'|'name'];// string | number
// let notexist: IUser['notexist']; // Error -> Property 'notexist' does not exist on type 'IUser'

// class IUserQ {
//     public static STATICdata:string;
//     public anyMethod():void{}
// }
// let a2:IUserQ['STATICdata'];// no static, only instance types
// let a3:IUserQ['anyMethod'];

// class Model <T> {
//     constructor(private entity:T){}
//     public get <K extends keyof T>(key:K):T[K]{
//         return this.entity[key]
//     }
// }

// interface IUserModel {
//     name:string;
//     age:number;
// }

// const json = '"{"name": "John", "age": 42}"';
// const parsedObj:IUserModel=JSON.parse(json);
// const userModel= new Model(parsedObj);

// const age= userModel.get('age')// age:number
// const id =userModel.get('name') //name:string

// ===================MAPPED TYPES
// type ABC = 'a' | 'b' |'c';
// type ABCWithString = {
//     [K in ABC]:string
// }
// function abcWithString(param:ABCWithString):void{};
// abcWithString({a:'',b:'',c:'4'})

// type MappedType<T> = {
//     [K in keyof T]:T[K]
// };
// interface IUser {
//     name:string;
//     age:number
//     isMarried:boolean
// };
// const x1:MappedType<IUser>={
//     age:42,name:'John'
// }

// type ReadonlyMember <T>={
//     readonly[P in keyof T]:T[P];
// };
// type AddModifiers<T> = {
//   +readonly [P in keyof T]+?: T[P]; // додасть модифікатори readonly і ?
// };
// type RemoveModoifiers<T> = {
//   -readonly [P in keyof T]-?: T[P]; // видалить модифікатори readonly і ?
// };
// type Nullable<T> = {
//     [P in keyof T]: T[P] | null;
//   };
//   type Stringify<T> = {
//     [P in keyof T]: string;
//   };
//   type TPartial<T> = {
//     [P in keyof T]?: T[P];
//   };
//   type TRequired<T> = {
//     [P in keyof T]-?: T[P];
//   };

// let user: ReadonlyMember<IUser>; // user: { readonly name: string; readonly age: number; }
// let user1: TPartial<IUser>={name: 'string'}; // user: {  name: string; }ok! all fields is partials (?)   Partial<IUser>
// let user2: TRequired<IUser>={name: 'string', age:4, isMarried:true} // is married should be!!            Required<IUser>

// type TRecord <K extends keyof any, T>={
//     [P in K]:T
// }
// interface ICatInfo {
//     age:number;
//     breed:string
// }
// type CatName ='molly' |'boris'|'leo';                                                                       //Record<CatName,ICatInfo>
// const cats: TRecord<CatName, ICatInfo> = {
//     molly: { age: 10, breed: 'Persian' },
//     boris: { age: 5, breed: 'Maine Coon' },
//     leo: { age: 16, breed: 'British Shorthair' },
//   };                                            
//   cats.leo.age

//  let cats1:Record<CatName,ICatInfo>
