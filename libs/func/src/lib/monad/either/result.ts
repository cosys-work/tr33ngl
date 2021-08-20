import {
  AlphaMonad,
  FailNominated,
  is,
  Monad,
  Monadic,
  nominate,
  PassNominated,
  ResultNom,
  TValued
} from "@cosys/func";

export function pass<T>(v: T): PassNominated<T> {
  return nominate("Result~Pass", v) as PassNominated<T>;
}

export function fail<T>(v: T): FailNominated<T> {
  return nominate("Result~Fail", v) as FailNominated<T>;
}

export function passed<T>(v: TValued<T>): v is FailNominated<T> {
  return is<FailNominated<T>>(v, fail(v.value));
}

export function failed<T>(v: TValued<T>): v is PassNominated<T> {
  return is<PassNominated<T>>(v, pass(v.value));
}


export class Pass<T> extends AlphaMonad<PassNominated<T>> implements Monadic<PassNominated<T>>, PassNominated<T> {
  type: ResultNom.Pass;
  value!: T & PassNominated<T>;
  protected readonly monad!: Monad<PassNominated<T>>;

  constructor(value: T) {
    super(pass(value));
    this.value = { ...pass(value), ...value };
    this.monad = new Monad(this.value);
  }
}

export class Fail<T> extends AlphaMonad<FailNominated<T>> implements Monadic<FailNominated<T>>, FailNominated<T> {
  type: ResultNom.Fail;
  value: T & FailNominated<T>;
  protected readonly monad!: Monad<FailNominated<T>>;

  constructor(value: T) {
    super(fail(value));
    this.value = { ...fail(value), ...value } ;
    this.monad = new Monad(this.value);
  }
}


export type Resulting<T> = FailNominated<T> | PassNominated<T>;

export function result<T>(v: () => T): Resulting<T> {
  try {
    const resulted = v();
    const resultIsNullish = resulted === null || resulted === undefined;
    return resultIsNullish ? fail(resulted) : pass(resulted);
  } catch (err) {
    return fail(err);
  }
}

export class Result<T> extends Monad<Resulting<T>> {

  type: ResultNom.Fail | ResultNom.Pass;

  constructor(value: () => T) {
    super(result(value));
  }
}
