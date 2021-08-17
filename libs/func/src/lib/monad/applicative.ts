import { Functor, Functorial } from "./functor";
import { Nominator } from "../nominators";
import { FuncMapper, Mapper, Ts } from "../mappable";
import { Observable } from "rxjs";

export interface Applicativity<A> extends Functorial<A>{
  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): Functorial<U[]>;
}

export class Applicative<A> implements Applicativity<A>, Functorial<A>, Nominator<A> {

  readonly type: string = "Applicative";
  readonly value!: A;
  readonly functor!: Functor<A>;

  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): Functorial<U[]> {
    const tsA: Ts<A> = fa.extract().val;
    const funcMapper = new FuncMapper(tsA);
    return this.return(funcMapper.map(transformApp));
  }

  constructor(value: A) {
    this.value = value;
    this.functor = new Functor<A>(value);
  }

  extract(): Mapper<A> {
    return this.functor.extract();
  }

  fmap<U extends Array<A>>(transform: (value: A) => U, fa: Functorial<A>): Functorial<U[]> {
    return this.functor.fmap(transform, fa);
  }

  observe(): Observable<Ts<A>> {
    return this.functor.observe();
  }

  return<U>(value: U): Functorial<U> {
    return this.functor.return(value);
  }
}
