import { Functor, Functorial } from "./functor";
import { Nominator } from "../nominators";
import { FuncMapper, Ts } from "../mappable";

export interface Applicativity<A> extends Functorial<A>{
  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): Functorial<U[]>;
}

export class Applicative<A> extends Functor<A> implements Applicativity<A>, Functorial<A>, Nominator<A> {

  readonly type: string = "Applicative";
  readonly value!: A;
  readonly functor!: Functor<A>;

  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): Functorial<U[]> {
    const tsA: Ts<A> = fa.extract().val;
    const funcMapper = new FuncMapper(tsA);
    return this.return(funcMapper.map(transformApp));
  }

  constructor(value: A) {
    super(value);
    this.value = value;
    this.functor = new Functor<A>(value);
  }
}
