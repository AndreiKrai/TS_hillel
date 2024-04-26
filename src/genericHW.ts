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
}
// Узагальнений стек  Створіть узагальнений клас Stack, який являє собою стек елементів з 
// методами push, pop і peek.  
// Узагальнений словник  Створіть узагальнений клас Dictionary, 
// який являє собою словник (асоціативний масив) з методами set, get і has. 
// Обмежте ключі тільки валідними типами для об'єкта.`1