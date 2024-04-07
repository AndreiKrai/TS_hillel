// class Animal {
//     private static DEFAULT_NAME : string= 'animal';
//     // #isLife: boolean = true;
//     private isLife: boolean = true;
//     public _name! :string
//     constructor(){
//         this._name = 'animal';
//     }
//     get isLife() {
//         return this.isLife;
//       }
//     static getDefName():string {
//         return Animal.DEFAULT_NAME
//     }
//     static greed(users:string):string;
//     static greed(users:string[]):string[];
//     static greed (user:unknown):unknown{
//         if (typeof user ==='string') {
//             return `Hello ${user}`
//         } else if (Array.isArray(user)){
//             return user.map(name=>`Hello ${name}`)
//         }
//         throw new Error('Unable to greed')
//     }
//     public sleep() {
//         // some default logic
//       }
// }

// Animal.getDefName()

// class Dog extends Animal {
//     constructor(){
//         super();
//         super.isLife = 'dog'
//     }
//     public override sleep(): void {
//         // some new logic
//     }
// }
 
// const animal:Animal = new Animal();
// // animal._name 
// const dog:Dog=new  Dog()
// // dog.isLife='fd'
// Animal.greed('Joe')