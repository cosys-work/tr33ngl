import {
  AlphaValued,
  Applicative,
  Applicativity,
  Functorial,
  FuncUOrFuncUs,
  Mappable,
  MonadMapper,
  Ts
} from "@cosys/func";
import { Observable } from "rxjs";

export interface Monadic<A> extends Applicativity<A> {
  bind<U>(ma: Functorial<A>, transformApp: (value: A) => Functorial<U>): FuncUOrFuncUs<U>;
  bindFlip<U>(transformApp: (val: A) => Functorial<U>, ma: Functorial<A>): FuncUOrFuncUs<U>;
}

export class Monad<A> implements Monadic<A> {

  readonly type: string = "Monad";
  readonly value!: A;
  readonly applicative!: Applicative<A>;

  constructor(value: A) {
    this.value = value;
    this.applicative = new Applicative<A>(value);
  }

  return<U>(value: U ): Functorial<U> {
    return this.applicative.return(value) ;
  }

  bind<U>(ma: Functorial<A>, transformApp: (val: A) => Functorial<U>): FuncUOrFuncUs<U> {
    const maExtract: Ts<A> = ma.extract().map(v => v);
    const monMapper: MonadMapper<A> = new MonadMapper(maExtract);
    const mapMap: Ts<U> = monMapper.map(transformApp);
    return this.return(mapMap);
  }

  bindFlip<U>(transformApp: (val: A) => Functorial<U>, ma: Functorial<A>): FuncUOrFuncUs<U> {
    return this.bind(ma, transformApp);
  }


  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): FuncUOrFuncUs<U> {
    return this.applicative.apply(transformApp, fa);
  }

  fmap<U>(transform: (value: A) => U, fa: Functorial<A>): Functorial<U[]> {
    return this.applicative.fmap(transform, fa);
  }

  fmap2<U>(transform: (value: A) => U, fa: Functorial<A>): FuncUOrFuncUs<U> {
    return this.applicative.fmap2(transform, fa);
  }

  extract(): Mappable<A> {
    return this.applicative.extract();
  }

  id(): Ts<A> {
    return this.applicative.id();
  }

  observe(): Observable<A> {
    return this.applicative.observe();
  }

}


export abstract class AlphaMonad<T>
  extends AlphaValued<T>
  implements Monadic<T> {

  readonly type!: string;
  protected readonly monad!: Monad<T>;

  protected constructor(value: T) {
    super(value);
    this.type = typeof value;
    this.monad = new Monad<T>(value);
  }

  apply<U>(transformApp: Functorial<(value: T) => U>, fa: Functorial<T>): FuncUOrFuncUs<U> {
    return this.monad.apply(transformApp, fa);
  }

  bind<U>(ma: Functorial<T>, transformApp: (value: T) => Functorial<U>): FuncUOrFuncUs<U> {
    return this.monad.bind(ma, transformApp);
  }

  bindFlip<U>(transformApp: (val: T) => Functorial<U>, ma: Functorial<T>): FuncUOrFuncUs<U> {
    return this.monad.bindFlip(transformApp, ma);
  }

  extract(): Mappable<T> {
    return this.monad.extract();
  }

  id(): Ts<T> {
    return this.monad.id();
  }

  fmap2<U>(transform: (value: T) => U, fa: Functorial<T>): FuncUOrFuncUs<U> {
    return this.monad.fmap(transform, fa);
  }

  fmap<U>(transform: (value: T) => U, fa: Functorial<T>): Functorial<U[]> {
    return this.monad.fmap(transform, fa);
  }

  observe(): Observable<T> {
    return this.monad.observe();
  }

  return<U>(value: U): FuncUOrFuncUs<U> {
    return this.monad.return(value);
  }
}
