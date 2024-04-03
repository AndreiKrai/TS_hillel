"use strict";
class School {
    constructor(areas, lectures) {
        this._areas = [];
        this._lecturers = [];
        this._areas = areas;
        this._lecturers = lectures;
    }
    get areas() {
        return this._areas;
    }
    get lecturers() {
        return this._lecturers;
    }
    addArea(area) {
        this._areas.push(area);
    }
    removeArea(areaToRemove) {
        this._areas = this._areas.filter(item => item !== areaToRemove);
    }
    addLecturer(lecturer) {
        this._lecturers.push(lecturer);
    }
    removeLecturer(lecturerToRemove) {
        this._lecturers = this._lecturers.filter(item => item !== lecturerToRemove);
    }
}
class Area {
    constructor(name, levels) {
        this._levels = [];
        this._name = name;
        this._levels = levels;
    }
    get levels() {
        return this._levels;
    }
    get name() {
        return this._name;
    }
    addLevel(level) {
        this._levels.push(level);
    }
    removeLevel(levelToRemove) {
        this._levels = this._levels.filter(item => item !== levelToRemove);
    }
}
class Level {
    constructor(name, description, groups) {
        this._name = name;
        this._description = description;
        this._groups = groups;
    }
    get groups() {
        return this._groups;
    }
    get name() {
        return this._name;
    }
    get description() {
        return this._description;
    }
    removeGroup(groupToRemove) {
        this._groups = this._groups.filter(group => group !== groupToRemove);
    }
    addGroup(groupToAdd) {
        this._groups.push(groupToAdd);
    }
}
class Group {
    constructor(directionName, levelName, area, status, students) {
        this._students = [];
        this._directionName = directionName;
        this._levelName = levelName;
        this._area = area;
        this._status = status;
        this._students = students;
    }
    set status(groupStatus) {
        this._status = groupStatus;
    }
    get area() {
        return this._area;
    }
    get status() {
        return this._status;
    }
    get studentst() {
        return this._students;
    }
    get directionName() {
        return this._directionName;
    }
    get levelName() {
        return this._levelName;
    }
    addStudent(student) {
        this._students.push(student);
    }
    removeStudent(studentToRemove) {
        this._students = this._students.filter(item => item !== studentToRemove);
    }
    showPerformance() {
        const sortedStudents = this._students.toSorted((a, b) => b.getPerformanceRating() - a.getPerformanceRating());
        return sortedStudents;
    }
}
class Student {
    constructor(firstName, lastName, birthYear, grades, visits) {
        this._firstName = firstName;
        this._lastName = lastName;
        this._birthYear = birthYear;
        this._grades = grades;
        this._visits = visits;
    }
    get fullName() {
        return `${this._lastName} ${this._firstName}`;
    }
    set fullName(value) {
        [this._lastName, this._firstName] = value.split(' ');
    }
    set grade(grages) {
        this._grades = Object.assign(Object.assign({}, this._grades), grages);
    }
    set visits(visitToSet) {
        this._visits.push(visitToSet);
    }
    get age() {
        return new Date().getFullYear() - this._birthYear;
    }
    getPerformanceRating() {
        const gradeValues = Object.values(this._grades);
        if (!gradeValues.length)
            return 0;
        const averageGrade = gradeValues.reduce((sum, grade) => sum + grade, 0) / gradeValues.length;
        const attendancePercentage = (this._visits.filter(present => present).length / this._visits.length) * 100;
        return (averageGrade + attendancePercentage) / 2;
    }
}
//# sourceMappingURL=prymitive2.js.map