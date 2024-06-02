// Single Responsibility
interface ITransactionRecord {
  readonly transactionType: TransactionTypeEnum;
  readonly amount: number;
}

enum TransactionTypeEnum {
  DEPOSIT = 'Deposit',
  WITHDRAWAL = 'Withdrawal',
  STOCK = 'Stock',
}

class TransactionHistory {
  private readonly transactions: ITransactionRecord[] = [];

  public addTransaction(transaction: ITransactionRecord): void {
    this.transactions.push(transaction);
  }
  public showTransactionHistory(): void {
    this.transactions.forEach(transaction => console.log(transaction));
  }
}

interface IBankClient {
  readonly firstName: string;
  readonly lastName: string;
}
interface IAccount {
  get balanceInfo(): string;
  makePayment(ammount: number, paymentSystem: IPaymentSystem): void;
}

interface IDepositable {
  deposit(amount: number): void;
}

interface IWithdrawable {
  withdraw(amount: number): void;
}

abstract class BaseBankAccount implements IAccount, IDepositable {
  protected balance = 0;

  protected readonly currency: string;
  protected readonly number: number;
  protected readonly transactionHistory: TransactionHistory;
  protected _holderName!: string;

  constructor(client: IBankClient, currency: string, number: number) {
    this.currency = currency;
    this.holderName = client;
    this.number = number;
    this.transactionHistory = new TransactionHistory();
  }

  public get balanceInfo(): string {
    return `${this.currency}${this.balance}`;
  }

  public get holderName(): string {
    return this._holderName;
  }

  public set holderName({ firstName, lastName }: IBankClient) {
    if (!firstName.trim()) throw new Error(`Client first name can't be empty!`);
    if (!lastName.trim()) throw new Error(`Client last name can't be empty!`);

    this._holderName = `${lastName} ${firstName}`;
  }

  public deposit(amount: number): void {
    this.balance += amount;
    this.recordTransaction(TransactionTypeEnum.DEPOSIT, amount);
  }

  public makePayment(amount: number, paymentSystem: IPaymentSystem): void {
    console.log(`Processing payment of ${amount} via ${paymentSystem.name}...`);
    paymentSystem.makePayment(amount);
  }

  protected recordTransaction(transactionType: TransactionTypeEnum, amount: number): void {
    const transaction: ITransactionRecord = { transactionType, amount };
    this.transactionHistory.addTransaction(transaction);
  }
}

class BankAccount extends BaseBankAccount implements IWithdrawable {
  public withdraw(amount: number): void {
    if (this.balance < amount) throw new Error(`Sorry ${this.holderName}, you don't have enough funds!`);

    this.balance -= amount;
    this.recordTransaction(TransactionTypeEnum.WITHDRAWAL, amount);
  }
}

// Open-Closed, create new class with his own logic, origin class didnt change

class InvestmentAccount extends BaseBankAccount {
  constructor(client: IBankClient, currency: string, number: number) {
    super(client, currency, number);
  }
  public buyStock(name: string, price: number): void {
    if (this.balance < price) throw new Error(`Sorry ${this.holderName}, you don't have enough funds!`);

    this.balance -= price;
    this.recordTransaction(TransactionTypeEnum.STOCK, price);
  }
}

// Liskov Substitution
// Для реалізації принципу Liskov Substitution у нашому прикладі з BankAccount, ми маємо переконатися,
// що об'єкти похідного класу, як-от InvestmentAccount, можуть використовуватися замість об'єктів
// базового класу BankAccount, не спричиняючи небажаних побічних ефектів.
const bankAccount = new BankAccount({ firstName: 'Max', lastName: 'Zug' }, 'USD', 1234);
const investmentAccount = new InvestmentAccount({ firstName: 'Max', lastName: 'Zug' }, 'USD', 1456);

function processAccount(account: IAccount & IDepositable, ammount: number) {
  account.deposit(ammount);
  console.log(`Account Balance: ${account.balanceInfo}`);
}
processAccount(bankAccount, 200);
console.log(bankAccount.balanceInfo); //200

processAccount(investmentAccount, 150);
console.log(investmentAccount.balanceInfo); //150

investmentAccount.buyStock('Apple', 1000);
console.log(investmentAccount.balanceInfo);

// Interface Segregation
// we split 1 interface to severals: IAccount, IDepositable, IWithdrawable
// Принцип поділу інтерфейсу говорить, що клієнти не повинні залежати від інтерфейсів,
// які вони не використовують. Це означає, що інтерфейси слід розділяти на дрібніші та специфічніші,
// щоб кожен клієнт міг залежати тільки від тих методів, які йому дійсно потрібні.

// Dependency inversion
// Принцип інверсії залежності свідчить, що високорівневі модулі не повинні залежати від низькорівневих модулів.
// Обидва типи модулів мають залежати від абстракцій. Крім того, абстракції не повинні залежати від деталей,
// а деталі повинні залежати від абстракцій
// створимо інтерфейс PaymentSystem, який представлятиме абстракцію для платіжної системи.
// Потім ми створимо дві конкретні реалізації цього інтерфейсу - одну для PayPal та іншу для Stripe.
// Потім у класі BankAccount реалізуємо метод makePayment, який делегуватиме платіжній системі виконання платежу.
interface IPaymentSystem {
  get name(): PaymentSystemEnum;
  makePayment(ammount: number): void;
}

enum PaymentSystemEnum {
  PAY_PAL = 'PayPal',
  STRIP = 'Strip',
}

class PayPalPaymentSystem implements IPaymentSystem {
  private readonly _name = PaymentSystemEnum.PAY_PAL;
  private readonly _email: string;
  constructor( email: string) {
    this._email = email;
  }
  public get name(): PaymentSystemEnum {
    return this._name;
  }
  public makePayment(amount: number): void {
    console.log(`Payment of ${amount} via ${this._name} to ${this._email}`);
  }
}
class StripePaymentSystem implements IPaymentSystem {
    private readonly _name= PaymentSystemEnum.STRIP;
    private readonly cardNumber: string;
  
    constructor(cardNumber: string) {
      this.cardNumber = cardNumber;
    }
  
    public get name(): PaymentSystemEnum {
      return this._name;
    }
  
    public makePayment(amount: number): void {
      console.log(`Payment of ${amount} via ${this.name} with card number ${this.cardNumber}`);
    }
  }

const paypalPaymentProcessor = new PayPalPaymentSystem("example@example.com");
const stripePaymentProcessor = new StripePaymentSystem("4242 4242 4242 4242");

bankAccount.makePayment(100,paypalPaymentProcessor)
investmentAccount.makePayment(500, stripePaymentProcessor);