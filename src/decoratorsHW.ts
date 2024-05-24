// Візьміть декоратор DeprecatedMethod і навчіть його працювати з об'єктом, який вміє приймати причину, 
// через яку його не варто використовувати, і назву методу, яким його можна замінити, якщо це можливо.  

function DeprecatedMethod1<T, A extends any[], R>(
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

  // Створіть декоратори MinLength, MaxLength та Email

  