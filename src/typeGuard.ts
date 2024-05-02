interface ICompany {
  name: string;
  departments: [];
  prevHiredPersonal: [];
  allPersonal: [];
}

interface IDepartment {
  name: string;
  domen: string;
  personalList: [];
  budget: { debet: number; credit: number };
}

interface IPrevHiredEmployee {
  name: string;
  sername: string;
  salary: string;
  cardNumber: number;
}

interface IEmployee {
  name: string;
  sername: string;
  salary: number;
  status: WorkerStatus;
  department: IDepartment;
}

interface IAccountant {
  name: string;
  sername: string;
  salary: number;
  status: WorkerStatus;
  department: IDepartment;
}
type WorkerStatus = 'active' | 'nonactive' | 'onBench';
type Budget ={ debet: number; credit: number };

class Company {
  constructor(
    private name: string,
    private departament: [],
    private prevHiredPersonal: [],
    private allPersonal: [],
    private departments: []
  ) {}
}

class Department implements IDepartment {
    constructor( public name: string,
        public domen: string,
        public   personalList: [],
        public   budget: Budget){}
}

class PrevHiredEmployee implements IPrevHiredEmployee {
    constructor( public name: string,
        public sername: string,
        public  salary: string,
        public   cardNumber: number){}
}