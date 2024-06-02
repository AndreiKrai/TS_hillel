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
  EDULT = 5,
  CHILD = 3,
  FAMILY = 15,
}
type AnimalHealthType = 'sick' | 'good' | 'exelent';
class Kassa {
  //  "Клієнти": Дані клієнтів зберігаються у Відділу реклами. dont really want to add _addDepartment propetry here, should I?
  private _daylyIncome: number = 0;
  public get daylyIncome() {
    return this._daylyIncome;
  }
  public close() {
    const summ = this._daylyIncome;
    this._daylyIncome = 0;
    return summ;
  }
  public increaseDaylyIncome(ammount: number): number {
    return (this._daylyIncome += ammount);
  }

  sendTicket(client: Client, clientList: IClientList[]) {
    clientList.forEach(list => list.addClient(client));
  }
}

// class Ticket {
//   public ticketType!: TicketType;
//   private price!: number;

//   constructor(ticketType: TicketType, price: number) {
//     (this.price = price), (this.ticketType = ticketType);
//   }
// }

class Client {
  private readonly _id!: number;
  private _firstName!: string;
  private _lastName!: string;
  private _contacts!: string;
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
  public get contacts(): string {
    return this._contacts;
  }
}
interface IClientList {
  list: Client[];
  addClient(client: Client): void;
  removeClent(client: Client): void;
}
class ClientList implements IClientList {
  protected _list: Client[] = [];
  get list(): Client[] {
    return this._list;
  }
  addClient(client: Client) {
    this._list.push(client);
  }
  removeClent(client: Client) {
    this._list = this._list.filter(i => i.id !== client.id);
  }
}

class CurrentVisitorsList extends ClientList {
  clearList(): void {
    this._list = [];
  }
}
class MarketingDepartment {
  //  Використовує список клієнтів для розсилки новин про зоопарк і рекламні акції.
}
class Receipts {
  //  "Виручка": Каса збирає дані про виручку за день. Ці дані передаються в Бухгалтерію.
}
class AccountDepartment {
  //  "Виручка": Каса збирає дані про виручку за день. Ці дані передаються в Бухгалтерію.
  private _kassa: Kassa = new Kassa();
  // Розпоряджається бюджетом, включно з оплатою співробітників,
private _budget:ZooBudget = new ZooBudget();
  //  закупівлею корму для тварин і обслуговуванням зоопарку. Зберігає дані про всіх співробітників, тварин і виплати.
  //  Можливість генерувати фінансові звіти.
}
class Administration {
  // Відповідає за управління співробітниками і тваринами. Може додавати і видаляти співробітників і тварин.
  //  Створює сповіщення про рекламні акції та інші важливі події в зоопарку.
}
class Animals {
  private _name!: string;
  private _species!: string;
  private _age!: number;
  private _health: AnimalHealthType = 'good';
}
class Employee {}
class ZooBudget {
  private _ammount: number = 0;
  public get ammount(): number {
    return this._ammount;
  }
  public debet(ammount: number): void {
    this._ammount += ammount;
  }
  public credit(ammount: number): void {
    this._ammount > ammount ? (this._ammount -= ammount) : console.log('Not enought money for transaction');
  }
}
