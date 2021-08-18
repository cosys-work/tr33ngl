import { left as failure, Leftness as Failure, Monad, right as success, Rightness as Success } from "@cosys/func";

export class Succeeded<T> extends Monad<Success<T>> implements Success<T> {
  type: "Right" = "Right";
  value!: T & Success<T>;

  constructor(value: T) {
    super(success(value));
    this.value = { ...super.value.value, ...{ type: this.type, value: value } };
  }
}

export class Failed<T> extends Monad<Failure<T>> implements Failure<T> {
  type: "Left" = "Left";
  value: T & Failure<T>;

  constructor(value: T) {
    super(failure(value));
    this.value = { ...super.value.value, ...{ type: this.type, value: value } };
  }
}


export type Resulting<T> = Failure<T> | Success<T>;

export function result<T>(v: () => T): Resulting<T> {
  const resulted = v();
  const resultIsNullish = resulted === null || resulted === undefined;
  return resultIsNullish ? failure(resulted) : success(resulted);
}

export class Result<T> extends Monad<Resulting<T>> {
  constructor(value: () => T) {
    super(result(value));
  }
}
