interface Identifier {
  [identifier: string]: string;
}

interface A {
  [key: string]: string; //anotation types the same! string everywere
  [key: symbol]: string;
  [key: number]: string;
}

// Визначте інтерфейс, який використовує сигнатуру індексу з типами об'єднання.
// Наприклад, тип значення для кожного ключа може бути число | рядок.

type Union = string | number;
interface IUnion {
  [key: Union]: string;
}

// Створіть інтерфейс, у якому типи значень у сигнатурі індексу є функціями.
// Ключами можуть бути рядки, а значеннями — функції, які приймають будь-які аргументи.

interface IIndexFunction {
  [key: string]: (arg: any) => any;
}

// Опишіть інтерфейс, який використовує сигнатуру індексу для опису об'єкта, подібного до масиву.
// Ключі повинні бути числами, а значення - певного типу.

interface ArrayLike<T> {
    [index: number]: T;
}

// Створіть інтерфейс з певними властивостями та індексною сигнатурою.
// Наприклад, ви можете мати властивості типу name: string та індексну сигнатуру для додаткових динамічних властивостей.

interface MyInterface {
    name: string;
    [key: string]: any;
}

// Створіть два інтерфейси, один з індексною сигнатурою, а інший розширює перший, додаючи специфічні властивості.

interface MyInterface1 {
    [key: string]: any;
}

interface MyInterface2 extends MyInterface1 {
    data:number[]
}

// Напишіть функцію, яка отримує об'єкт з індексною сигнатурою і перевіряє, чи відповідають значення певних ключів
// певним критеріям (наприклад, чи всі значення є числами).

interface IndexSignatureObject {
    [key: string]: any;
}

function checkValues(obj: IndexSignatureObject): boolean {
    for (const key in obj) {
        if (typeof obj[key] !== 'number') {
            return false;
        }
    }
    return true;
}

const ob1 :IndexSignatureObject = {a:1,b:2}
// console.log( checkValues(ob1));
