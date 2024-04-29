const filterArray = <T>(array: T[], condition: (item: T) => boolean): T[] => {
  return array.filter(item => condition(item))
  // array.filter((word) => word.length > 6)
}

// Узагальнений стек  Створіть узагальнений клас Stack, який являє собою стек елементів з 
// методами push, pop і peek.  
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

// Узагальнений словник  Створіть узагальнений клас Dictionary, 
// який являє собою словник (асоціативний масив) з методами set, get і has. 
// Обмежте ключі тільки валідними типами для об'єкта.
interface IObj {[key:string]:any}

class Dictionary <T extends IObj>{
  constructor( private itemArray: Array <T>){}

  get <K extends keyof T> (key:K): T[K] | undefined {
    const foundItem=this.itemArray.find(item=>key in item)
  return foundItem? foundItem['key']:undefined}

  set (data:T):void{
    this.itemArray.push(data)
  }
  has <K extends string> (key:K): boolean {
     return Boolean( this.itemArray.find(item=>key in item))
}
}

