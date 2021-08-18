import { JustNominator, NothingNominator, is, nominate, TValued, Monad } from "@cosys/func";

export function nothing(): NothingNominator {
  return nominate("Nothing", "Nothing") as NothingNominator;
}

export function isNothing(v: TValued<unknown>): v is NothingNominator {
  return is<NothingNominator>(v, nothing());
}

export class Nothing extends Monad<"Nothing"> implements NothingNominator {
  readonly type: string = "Nothing";
  readonly value = "Nothing";

  constructor() {
    super("Nothing");
  }
}

export function just<T>(v: T): JustNominator<T> {
  return nominate("Just", v) as JustNominator<T>;
}

export function isJust<T>(v: TValued<T>): v is JustNominator<T> {
  return is<JustNominator<T>>(v, just(v.value));
}

export class Just<T> extends Monad<JustNominator<T>> implements JustNominator<T> {
  readonly type: "Just" = "Just";
  readonly value!: T & JustNominator<T>;

  constructor(value: T) {
    super(just(value));
    this.value = { ...super.value.value, ...{ value: value, type: this.type} };
  }
}


export type Maybeness<T> = JustNominator<T> | NothingNominator;

export function maybe<T>(t: T): Maybeness<T> {
  return t === undefined || t === null
    ? nothing()
    : just<T>(t);
}

export class Maybe<T> extends Monad<Maybeness<T>> {
  constructor(value: T) {
    super(maybe(value));
  }
}
