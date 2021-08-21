import { FuncMapper, Functor, Functorial, FuncUOrFuncUs, Mappable, Ts } from "@cosys/func";
import { Observable } from "rxjs";

export interface Applicativity<A> extends Functorial<A>{
  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): FuncUOrFuncUs<U>;
}

export class Applicative<A> implements Applicativity<A> {

  readonly type: string = "Applicative";
  readonly value!: A;
  readonly functor!: Functor<A>;

  constructor(value: A) {
    this.value = value;
    this.functor = new Functor<A>(value);
  }

  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): FuncUOrFuncUs<U> {
    const tsA: Ts<A> = fa.extract().id();
    const tsU: Ts<U> = new FuncMapper(tsA).map(transformApp);
    return tsU.length === 1 ? this.return(tsU[0]) : this.return(tsU);
  }
2
  extract(): Mappable<A> {
    return this.functor.extract();
  }

  id(): Ts<A> {
    return this.functor.id();
  }

  fmap2<U>(transform: (value: A) => U, fa: Functorial<A>): FuncUOrFuncUs<U> {
    return this.functor.fmap2(transform, fa);
  }

  fmap<U>(transform: (value: A) => U, fa: Functorial<A>): Functorial<U[]> {
    return this.functor.fmap(transform, fa);
  }

  observe(): Observable<A> {
    return this.functor.observe();
  }

  return<U>(value: U): Functorial<U> {
    return this.functor.return(value);
  }
}
