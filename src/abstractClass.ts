abstract class Figure {
    abstract color:string;
    abstract name:string;
    abstract calculateArea():number
}

class Circle extends Figure {
    private static DEFAULT_NAME : string= 'circle';
    public readonly name: string = Circle.DEFAULT_NAME 
    constructor (
        public readonly color:string,
        public radius:number
    ){  super();}

    calculateArea(): number {
        return this.radius*this.radius*Math.PI
    }
}

class Rectangle extends Figure {
    public readonly name: string = 'rectanle' 
    constructor(
        public readonly color:string,
        public sideA: number,
        public sideB: number,
    ){
        super()
    }
    calculateArea(): number {
        return this.sideA*this.sideB
    }
    print(): string {
       return `Àrea formula: ${this.sideA} * ${this.sideB}`
    }
}

class Square extends Rectangle {
    public readonly name: string = 'square'
    constructor(
        public readonly color: string,
        public sideA: number,
    ) {
        super(color, sideA, sideA);
    }
}

class Triangle extends Figure {
    public readonly name: string = 'triangle'
    constructor(
        public readonly color:string,
        public height: number,
        public base:number,
    ){
        super()
    }
    calculateArea(): number {
        return  0.5 * this.base * this.height
    }
}
