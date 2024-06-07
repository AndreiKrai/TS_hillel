// Проект Zoo  До нас звернувся невеликий приватний зоопарк для створення застосунку,
// який полегшить управління бізнесом. Нижче опис сутностей, які є на даний момент. Вам необхідно ознайомиться,
// поставити уточнювальні запитання, після чого побудувати програму на основі наявних у вас знань. Використовуйте шаблони,
// можливості ТS і своє уявлення про прекрасне.

// Проєкт "Зоопарк": "Каса": Відповідає за продаж квитків.
// Квитки можуть бути трьох видів: дорослі, дитячі та сімейні. Кожен квиток має вартість. Під час продажу квитка,
// Каса додає дані про відвідувача у два списки: поточні відвідувачі та клієнти.
// "Поточні відвідувачі":
//  Зберігає інформацію про відвідувачів, включаючи їхні імена та контактні дані.

//  Можливість оповіщення відвідувачів за 15 хвилин до закриття і перед відходом.

//  "Клієнти": Дані клієнтів зберігаються у Відділу реклами.

//  Відділ реклами використовує цей список для розсилки новин про зоопарк і рекламні акції.
//  "Відділ реклами": Відповідає за маркетингові та рекламні заходи.
//  Використовує список клієнтів для розсилки новин про зоопарк і рекламні акції.
//  "Виручка": Каса збирає дані про виручку за день. Ці дані передаються в Бухгалтерію.
//  "Бухгалтерія": Відповідає за фінансове управління зоопарку. Розпоряджається бюджетом, включно з оплатою співробітників,
//  закупівлею корму для тварин і обслуговуванням зоопарку. Зберігає дані про всіх співробітників, тварин і виплати.
//  Можливість генерувати фінансові звіти.
//  "Адміністрація": Відповідає за управління співробітниками і тваринами. Може додавати і видаляти співробітників і тварин.

//  Створює сповіщення про рекламні акції та інші важливі події в зоопарку.

//  "Тварини": Включає в себе інформацію про кожну тварину, таку як вид, ім'я, вік, здоров'я та інші характеристики.
//  "Співробітники": Адміністрація може додавати і видаляти співробітників.
//  Співробітники можуть мати різні посади та обов'язки, які слід враховувати.
//  "Бюджет": Бухгалтерія розпоряджається бюджетом і стежить за фінансами зоопарку.
//  Можливість вести бюджетний облік і надавати фінансові звіти.

enum TicketType {
  ADULT = 'adult',
  CHILD = 'child',
  FAMILY = 'family',
}
const ticketPrice = {
  [TicketType.ADULT]: 50,
  [TicketType.CHILD]: 25,
  [TicketType.FAMILY]: 100,
};
enum TransactionTypeEnum {
  DEBET = 'debet',
  CREDIT = 'credit',
  KASSA = 'kassa',
  SALARY = 'salary',
}
type AnimalHealthType = 'sick' | 'good' | 'exelent';
class Kassa {
  //  "Клієнти": Дані клієнтів зберігаються у Відділу реклами. dont really want to add _addDepartment propetry here, should I?
  private _daylyIncome: number = 0;
  private _ticket: Ticket | null = null;

  public get daylyIncome(): number {
    return this._daylyIncome;
  }
  public closeDay(): number {
    // dont know how name it in another way, we use it to close day, entire day money put to account. call that dayly.
    const summ = this._daylyIncome;
    this._daylyIncome = 0;
    return summ;
  }
  public sellTicket(ticketType: TicketType, client: Person, clientList: Person[][]): void {
    clientList.forEach(list => list.push(client));
    this.issueTicket(ticketType);
    this.increaseDaylyIncome(ticketType);
  }
  protected issueTicket(ticketType: TicketType): Ticket {
    return (this._ticket = new Ticket(ticketType));
  }
  protected increaseDaylyIncome(ticketType: TicketType): number {
    return (this._daylyIncome += ticketPrice[ticketType]);
  }
}

class Ticket {
  protected _ticketType!: TicketType;
  protected _price!: number;
  constructor(ticketType: TicketType) {
    (this._price = ticketPrice[ticketType]), (this._ticketType = ticketType);
  }
}
class Person {
  private readonly _id!: number;
  private _firstName!: string;
  private _lastName!: string;
  private _contacts?: string;
  constructor(id: number, firstName: string, lastName: string, contacts: string) {
    ((this._id = id), (this._firstName = firstName)), (this._lastName = lastName), (this._contacts = contacts);
  }

  public get firstName(): string {
    return this._firstName;
  }
  public get lastName(): string {
    return this._lastName;
  }
  public get id(): number {
    return this._id;
  }
  public get contacts(): string | undefined {
    return this._contacts;
  }
}
const clientsList: Person[] = [];
const currentVisitorsList: Person[] = [];

class MarketingDepartment {
  //  Використовує список клієнтів для розсилки новин про зоопарк і рекламні акції.
  public sendAdvitisement(clientList: Person[], advertisement: string) {
    clientList.forEach(client => {
      console.log(`Sending ${advertisement} to ${client.firstName}`);
    });
  }
}
class Receipts {
  //  "Виручка": Каса збирає дані про виручку за день. Ці дані передаються в Бухгалтерію.
}
class AccountDepartment {
  //  "Виручка": Каса збирає дані про виручку за день. Ці дані передаються в Бухгалтерію.
  // Розпоряджається бюджетом, включно з оплатою співробітників,
  private _account: Account = new Account();
  private _employee: Employer[] = [];
  private _animals: Animal[] = [];

  get employee(): Employer[] {
    return this._employee;
  }
  get animals(): Animal[] {
    return this._animals;
  }
  public closeKassa(kassa: Kassa): void {
    const daylyIncome = kassa.closeDay();
    this._account.getPayment(daylyIncome, TransactionTypeEnum.KASSA);
  }
  public paySalaries(): void {
    this._employee.forEach(employee => this._account.makePayment(employee.salary, TransactionTypeEnum.SALARY));
    // this.balance -= employee.reduce((acc, employee)=>acc += employee.salary,0)
  }
  //  "Адміністрація": Відповідає за управління співробітниками і тваринами. Може додавати і видаляти співробітників і тварин.
  public addListManager(item: Employer | Animal): void {
    const list: (Employer | Animal)[] = isAnimal(item) ? this._animals : this._employee;
    if (!list.includes(item)) {
      list.push(item);
    } else {
      console.log('This item is already in the list');
    }
  }
  public removeListManager(item: Employer | Animal): void {
    const list: (Employer | Animal)[] = isAnimal(item) ? this._animals : this._employee;
    const index = list.indexOf(item);
    if (index != -1) {
      list.splice(index, 1);
    }
  }
  public generateReport(account: Account, typeOfReport: any): ITransactionRecord[] {
    return account.createReport(new Date());
  }
  //  закупівлею корму для тварин і обслуговуванням зоопарку. Зберігає дані про всіх співробітників, тварин і виплати.
  //  Можливість генерувати фінансові звіти.
}

class Administration {
  // Відповідає за управління співробітниками і тваринами. Може додавати і видаляти співробітників і тварин.
  //  Створює сповіщення про рекламні акції та інші важливі події в зоопарку.
  addEmployer(accountDepartment: AccountDepartment, employer: Employer): void {
    accountDepartment.addListManager(employer);
  }
  removeEmployer(accountDepartment: AccountDepartment, employer: Employer): void {
    accountDepartment.removeListManager(employer);
  }
  addAnimal(accountDepartment: AccountDepartment, animal: Animal): void {
    accountDepartment.addListManager(animal);
  }
  removeAnimal(accountDepartment: AccountDepartment, animal: Animal): void {
    accountDepartment.removeListManager(animal);
  }
}
class Animal {
  private _name!: string;
  private _species!: string;
  private _age!: number;
  private _health: AnimalHealthType = 'good';
}
class Employer extends Person {
  private _salary!: number;
  set salary(ammount: number) {
    this._salary = ammount;
  }
  get salary(): number {
    return this._salary;
  }
}
class Account {
  protected _balance = 0;
  protected readonly transactionHistory: TransactionHistory;
  public get balance(): number {
    return this._balance;
  }
  constructor() {
    this.transactionHistory = new TransactionHistory();
  }
  public createReport(date: Date): ITransactionRecord[] {
    const list = this.transactionHistory.showTransactionHistory();
    // some logic
    return list.filter(transaction => transaction.date >= date);
  }
  public getPayment(ammount: number, transactionType: TransactionTypeEnum.KASSA | TransactionTypeEnum.DEBET): void {
    this._balance += ammount;
    this.recordTransaction(transactionType, ammount);
  }
  public makePayment(ammount: number, transactionType: TransactionTypeEnum): void {
    if (this.balance >= ammount) {
      this._balance -= ammount;
      this.recordTransaction(transactionType, ammount);
      //   paymentSystem.makePayment(amount);
    } else console.log('Not enought money');
  }
  protected recordTransaction(transactionType: TransactionTypeEnum, amount: number): void {
    const transaction: ITransactionRecord = { transactionType, amount, date: new Date() };
    this.transactionHistory.addTransaction(transaction);
  }
}
interface ITransactionRecord {
  readonly transactionType: TransactionTypeEnum;
  readonly amount: number;
  readonly date: Date;
}
class TransactionHistory {
  private readonly transactions: ITransactionRecord[] = [];

  public addTransaction(transaction: ITransactionRecord): void {
    this.transactions.push(transaction);
  }
  public showTransactionHistory(): ITransactionRecord[] {
    return this.transactions;
  }
}
function isAnimal(item: any): item is Animal {
  return item instanceof Animal;
}
