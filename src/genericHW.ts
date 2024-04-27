const filterArray = <T>(array: T[], condition: (item: T) => boolean): T[] => {
  return array.filter(item => condition(item))
  // array.filter((word) => word.length > 6)
}

class Stack  <T> {
  constructor(public array: T[]) {}

  push(item:T): void {
    this.array = [...this.array, item]
  }
  pop():T| undefined{

    return this.array.pop()
  }
  peek():T | undefined {
    if (this.array.length===0) {
      return undefined
    }
    return this.array.reverse()[0]
  }
}

interface IObj {[key:string]:any}

class Dictionary <T extends IObj>{
  constructor( private itemArray: Array <T>){}

  get value <K extends keyof T> (key:K): T[K] | undefined {
    const foundItem=this.itemArray.find(item=>key in item)
  return foundItem?foundItem[key]:undefined}
  //  got that err An accessor cannot have type parameters. what to do???

  set value <T extends IObj>(data:T):void{
    this.itemArray.push(data)
  }

  
getValue<K extends keyof T>(key: K): T[K] | undefined {
  // Check if the key exists in the itemArray
  const foundItem = this.itemArray.find(item => key in item);
  return foundItem ? foundItem[key] : undefined;
}}
// Узагальнений стек  Створіть узагальнений клас Stack, який являє собою стек елементів з 
// методами push, pop і peek.  
// Узагальнений словник  Створіть узагальнений клас Dictionary, 
// який являє собою словник (асоціативний масив) з методами set, get і has. 
// Обмежте ключі тільки валідними типами для об'єкта.