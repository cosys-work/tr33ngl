import { AlphaMonad } from "../../../alpha/monad";
import { fail, FailNominator, pass, PassNominator } from "./result.nominator";
import { Monad, Monadic } from "@cosys/func";


export class Pass<T>
  extends AlphaMonad<PassNominator<T>>
  implements Monadic<PassNominator<T>> {
  readonly value!: T & PassNominator<T>;
  constructor(value: T) {
    super(pass(value));
    this.value = { ...super.u, ...value };
  }
}

export class Fail<T>
  extends AlphaMonad<FailNominator<T>>
  implements Monadic<FailNominator<T>> {
  readonly value: T & FailNominator<T>;
  constructor(value: T) {
    super(fail(value));
    this.value = { ...super.u, ...value } ;
  }
}


export type Resulting<T> =
  Monadic<FailNominator<T>> |
  Monadic<PassNominator<T>>;
export function result<T>(v: () => T): Resulting<T> {
  try {
    const resulted = v();
    const resultIsNullish =
      resulted === null || resulted === undefined;
    return resultIsNullish ?
      new Monad(fail(resulted)) :
      new Monad(pass(resulted));
  } catch (err: unknown) {
    return new Monad(fail(err as T));
  }
}

export class Result<T>
  extends AlphaMonad<Resulting<T>>
  implements Monadic<Resulting<T>> {
  constructor(value: () => T) {
    super(result(value));
  }
}
