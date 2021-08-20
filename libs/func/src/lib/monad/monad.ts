import { AlphaValued, Applicative, Applicativity, Functorial, Mapper, MonadMapper, Ts } from "@cosys/func";
import { Observable } from "rxjs";

export interface Monadic<A> extends Applicativity<A> {
  bind<U extends Ts<A>>(ma: Functorial<A>, transformApp: (value: A) => Functorial<U>): Functorial<Ts<U>>;
}

export class Monad<A> implements Monadic<A> {

  readonly type: string = "Monad";
  readonly value!: A;
  readonly applicative!: Applicative<A>;

  constructor(value: A) {
    this.value = value;
    this.applicative = new Applicative<A>(value);
  }

  bind<U extends Ts<A>>(ma: Functorial<A>, transformApp: (val: A) => Functorial<U>): Functorial<Ts<U>> {
    const maExtract: Ts<A> = ma.extract().map(v => v);
    const monMapper: MonadMapper<A> = new MonadMapper(maExtract);
    const mapMap: Ts<U> = monMapper.map(transformApp);
    return this.returns(mapMap);
  }

  bindFlip<U extends Ts<A>>(transformApp: (val: A) => Functorial<U>, ma: Functorial<A>): Functorial<Ts<U>> {
    return this.bind(ma, transformApp);
  }

  returns<U>(us: Ts<U>): Functorial<Ts<U>> {
    return new Monad<Ts<U>>(us);
  }

  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): Functorial<Ts<U>> {
    return this.applicative.apply(transformApp, fa);
  }

  fmap<U extends Ts<A>>(transform: (value: A) => U, fa: Functorial<A>): Functorial<Ts<U>> {
    return this.applicative.fmap(transform, fa);
  }

  return<U>(value: U): Functorial<U> {
    return this.applicative.return(value);
  }

  extract(): Mapper<A> {
    return this.applicative.extract();
  }

  observe(): Observable<A> {
    return this.applicative.observe();
  }

}


export abstract class AlphaMonad<T> extends AlphaValued<T> implements Monadic<T> {
  type: string;
  protected readonly monad!: Monad<T>;

  protected constructor(value: T) {
    super(value);
    this.monad = new Monad<T>(value);
  }

  apply<U>(transformApp: Functorial<(value: T) => U>, fa: Functorial<T>): Functorial<U[]> {
    return this.monad.apply(transformApp, fa);
  }

  bind<U extends Ts<T>>(ma: Functorial<T>, transformApp: (value: T) => Functorial<U>): Functorial<Ts<U>> {
    return this.monad.bind(ma, transformApp);
  }

  extract(): Mapper<T> {
    return this.monad.extract();
  }

  fmap<U extends Ts<T>>(transform: (value: T) => U, fa: Functorial<T>): Functorial<U[]> {
    return this.monad.fmap(transform, fa);
  }

  observe(): Observable<T> {
    return this.monad.observe();
  }

  return<U>(value: U): Functorial<U> {
    return this.monad.return(value);
  }
}
