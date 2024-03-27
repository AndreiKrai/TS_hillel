class School {
  directions:Direction[] = [];

  addDirection(direction:Direction) {
    this.directions.push(direction);
  }
}

class Direction {
  levels:Level[]  = [];

  constructor( name:string ) {
    this._name = name;
  }
  get name():string {
    return this._name;
  }

  addLevel(level:Level) {
    this.levels.push(level);
  }
}

class Level {
  groups:Group[] = [];

  constructor( name:string,  program:string) {
    this.name = name;
    this._program = program;
  }

  get name():string {
    return this._name;
  }

  get program():string {
    return this._program;
  }

  addGroup(group:Group) {
    this.groups.push(group);
  }
}

class Group {
  _students:Student[] = [];

  constructor(directionName:string, levelName:string) {
    this.directionName = directionName;
    this.levelName = levelName;
  }

  get students():Student[] {
    return this._students;
  }
  addStudent(student:Student) {
    this._students.push(student);
  }

  showPerformance() {
    const sortedStudents = this.students.toSorted(
      (a, b) => b.getPerformanceRating() - a.getPerformanceRating()
    );

    return sortedStudents;
  }
}

class Student {
  grades:{[subject:string]:number} = {};
  attendance:Date[] = [];

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

  get age() {
    return new Date().getFullYear() - this.birthYear;
  }

  setGrade(subject:string, grade:number) {
    this.grades[subject] = grade;
  }

  markAttendance(present:Date) {
    this.attendance.push(present);
  }

  getPerformanceRating():number {
    const gradeValues = Object.values(this.grades);

    if (gradeValues.length === 0) return 0;

    const averageGrade =
      gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;

    const attendancePercentage =
      (this.attendance.filter((present) => present).length /
        this.attendance.length) *
      100;

    return (averageGrade + attendancePercentage) / 2;
  }
}