class School {
  directions:Direction[] = [];

  addDirection(direction:Direction):void {
    this.directions.push(direction);
  }
}

class Direction {
  private _name: string;
  levels:Level[]  = [];

  constructor( name:string ) {
    this._name = name;
  }
  get name():string {
    return this._name;
  }

  addLevel(level:Level):void {
    this.levels.push(level);
  }
}

class Level {
  private _program:string
  private _name: string;

  groups:Group[] = [];

  constructor( name:string,  program:string) {
    this._name = name;
    this._program = program;
  }

  get name():string {
    return this._name;
  }

  get program():string {
    return this._program;
  }

  addGroup(group:Group):void {
    this.groups.push(group);
  }
}

class Group {
  _students:Student[] = [];
  directionName:string
  levelName:string

  constructor(directionName:string, levelName:string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  get students():Student[] {
    return this._students;
  }
  addStudent(student:Student):void {
    this._students.push(student);
  }

  showPerformance():Student[]  {
    const sortedStudents = this._students.toSorted(
      (a:Student, b:Student):number => b.getPerformanceRating() - a.getPerformanceRating()
    );
    return sortedStudents;
  }
}

class Student {
  grades:{[subject:string]:number} = {};
  attendance:boolean[] = [];

  constructor(private firstName:string,private lastName:string,private birthYear:number) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.birthYear = birthYear;
  }

  get fullName():string {
    return `${this.lastName} ${this.firstName}`;
  }

  set fullName(value:string) {
    [this.lastName, this.firstName] = value.split(" ");
  }

  get age():number {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject:string, grade:number) {
    this.grades[subject] = grade;
  }

  markAttendance(present:boolean):void {
    this.attendance.push(present);
  }

  getPerformanceRating():number {
    const gradeValues: number[] = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade =
      gradeValues.reduce((sum:number, grade:number):number => sum + grade, 0) / gradeValues.length;

    const attendancePercentage =
      (this.attendance.filter((present:boolean) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}