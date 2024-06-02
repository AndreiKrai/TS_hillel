//  === Class decorator ===

interface IRocketTank {
  isReadyForCheck(): boolean;
  isReadyForLaunch(): boolean;
}

@WithTank
class Rocket {
  @DeprecatedProperty
  fuel = 75;

  checkForStart(): boolean {
    return this.fuel !== 0;
  }
}

const rocket = new Rocket() as Rocket & IRocketTank;
console.log(rocket.isReadyForCheck());

type Constructor<T = {}> = new (...args: any[]) => T;

function WithTank<T extends Constructor>(originalClass: T, context: ClassDecoratorContext<T>) {
  if (context.kind !== 'class') throw new Error('Class-only decorator');

  class ReplacementClass extends originalClass implements IRocketTank {
    private _tankVolume = 100;

    public get tankVolume(): number {
      return this._tankVolume;
    }

    @MinMaxTankVolume
    public set tankVolume(val: number) {
      this._tankVolume = val;
    }

    @DeprecatedMethod
    public isReadyForCheck(): boolean {
      return this.tankVolume > 0;
    }

    public isReadyForLaunch(): boolean {
      return this.tankVolume === 100;
    }
  }
  return ReplacementClass;
}

//  === Method decorator ===

function DeprecatedMethod<T, A extends any[], R>(
  originalMethod: (...args: A) => R,
  context: ClassMethodDecoratorContext<T, (...args: A) => R>
) {
  if (context.kind !== 'method') throw new Error('Method-only decorator');

  function replacementMethod(this: T, ...args: A): R {
    console.log(`${String(context.name)} is deprecated and will be removed in a future version.`);
    return originalMethod.apply(this, args);
  }
  return replacementMethod;
}

//  === Property decorator ===

function DeprecatedProperty<T, V>(originalProperty: undefined, context: ClassFieldDecoratorContext<T, V>) {
  if (context.kind !== 'field') throw new Error('Field-only decorator');

  function updatedProperty(this: T, origianlValue: V): V {
    console.log(`${String(context.name)} is deprecated and will be removed in a future version.`);
    return origianlValue;
  }
  return updatedProperty;
}

//  === Accessors decorator ===

function MinMaxTankVolume<T>(originalMethod: (value: number) => void, context: ClassSetterDecoratorContext<T, number>) {
  if (context.kind !== 'setter') throw new Error('Setter-only decorator');

  function replacementMethod(value: number): void {
    if (value < 0) throw new Error("Value can't be less then 0");
    if (value > 100) throw new Error("Value can't be more then 100");
    return originalMethod.apply(this, [value]);
  }

  return replacementMethod;
}
//   70 original property
//  71 log?
