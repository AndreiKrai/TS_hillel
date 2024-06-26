type Lecturer = {name:string, surname:string, position:string, company:string, experience:string, courses:string, contacts:string}
class School {
    
    _areas:Area[] = [];
    _lecturers:Lecturer[] = []; 
    
    constructor(areas:Area[], lectures:Lecturer[]){
        this._areas=areas;
        this._lecturers=lectures
    }
    
    get areas():Area[] {
        return this._areas;
    }
    
    get lecturers():Lecturer[] {
        return this._lecturers;
    }
    
    addArea(area:Area):void{
        this._areas.push(area)
    }
    
    removeArea (areaToRemove:Area) : void {
        this._areas = this._areas.filter(item => item !== areaToRemove);
    }    
    
    addLecturer(lecturer:Lecturer):void{
        this._lecturers.push(lecturer)
    }
    
    removeLecturer (lecturerToRemove:Lecturer) : void {
        this._lecturers = this._lecturers.filter(item => item !== lecturerToRemove);
    }  
}
  
  class Area {
    // implement getters for fields and 'add/remove level' methods
    _levels: Level [] = [];
    _name: string;
  
    constructor(name:string, levels: Level []) {
      this._name = name;
      this._levels = levels
    }

    get levels () : Level [] {
        return this._levels
    }

    get name () : string {
        return this._name
    }

    addLevel (level:Level) : void {
        this._levels.push(level)
    }

    removeLevel (levelToRemove:Level) : void {
        this._levels = this._levels.filter(item => item !== levelToRemove);
        }  
  }
  
  class Level {
    // implement getters for fields and 'add/remove group' methods
    _groups: Group[];
    _name : string;
    _description : string;
  
    constructor(name:string, description:string, groups:Group[]) {
      this._name = name;
      this._description = description;
      this._groups = groups
    }

    get groups () : Group[] {
        return this._groups
    }

    get name () : string {
        return this._name
    }

    get description () : string {
        return this._description
    }

    removeGroup (groupToRemove:Group) : void {
        this._groups = this._groups.filter(group => group !== groupToRemove);
        }   
     
    addGroup (groupToAdd:Group): void {
        this._groups.push(groupToAdd)
    }
    }

  
  
  class Group {

    _area: string;
    _status: ('active' | 'pending');
    _students: Student[] = []; // Modify the array so that it has a valid toSorted method*
    _directionName: string;
    _levelName: string;
  
    constructor(directionName: string, levelName: string, area: string, status: ('active' | 'pending'), students: Student[]) {
      this._directionName = directionName;
      this._levelName = levelName;
      this._area = area;
      this._status = status;
      this._students = students;
    }

    set status (groupStatus:('active' | 'pending')) {
        this._status = groupStatus
    }
    get area () : string {
        return this._area
    }
    get status () : string {
        return this._status
    }    
    get studentst () : Student[] {
        return this._students
    }    
    get directionName () : string {
        return this._directionName
    }    
    get levelName () : string {
        return this._levelName
    }
    addStudent(student: Student) : void {
        this._students.push(student)
    }
    removeStudent (studentToRemove: Student) : void {
        this._students = this._students.filter(item => item !== studentToRemove );
    }    

    showPerformance() :Student [] {
      const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
      return sortedStudents;
    }
}
  
type Grades = {[workName:string]:number};  

class Student {
    // implement 'set grade' and 'set visit' methods
    _firstName: string;
    _lastName: string;
    _birthYear: number;
    _grades: Grades
    _visits: boolean[]
  
    constructor(firstName: string, lastName: string, birthYear: number, grades:Grades , visits:boolean[]) {
      this._firstName = firstName;
      this._lastName = lastName;
      this._birthYear = birthYear;
      this._grades = grades;
      this._visits= visits;
    }
  
    get fullName(): string {
      return `${this._lastName} ${this._firstName}`;
    }
  
    set fullName(value: string) {
      [this._lastName, this._firstName] = value.split(' ');
    }
    
    set grade (grages:Grades){
       this._grades={...this._grades, ...grages}
    }

    set visits (visitToSet: boolean){
        this._visits.push(visitToSet)
    }

    get age():number {
      return new Date().getFullYear() - this._birthYear;
    }
  
    getPerformanceRating():number {
      const gradeValues  = Object.values(this._grades);// I see some missunderstand here as _grades seems to be obj but it initialise as []
  
      if (!gradeValues.length) return 0;
  
      const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
      const attendancePercentage = (this._visits.filter(present => present).length / this._visits.length) * 100;
  
      return (averageGrade + attendancePercentage) / 2;
    }
  }

