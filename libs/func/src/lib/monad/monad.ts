import { Applicative, Applicativity, Functorial, Mapper, MonadMapper, Ts } from "@cosys/func";
import { Observable } from "rxjs";

export interface Monadic<A> extends Applicativity<A> {
  bind<U extends Array<A>>(ma: Monadic<A>, transformApp: (value: A) => Monadic<U>): Monadic<U[]>;
}

export class Monad<A> implements Monadic<A> {

  readonly type: string = "Monad";
  readonly value!: A;
  readonly applicative!: Applicative<A>;

  constructor(value: A) {
    this.value = value;
    this.applicative = new Applicative<A>(value);
  }

  pure2<U>(us: U[]): Monadic<U[]> {
    return new Monad<U[]>(us);
  }

  pure<U>(u: U): Monadic<U> {
    return new Monad<U>(u);
  }


  bind<U extends Array<A>>(ma: Monadic<A>, transformApp: (val: A) => Monadic<U>): Monadic<U[]> {
    const maExtract: A[] = ma.extract().map(v => v);
    const monMapper: MonadMapper<A> = new MonadMapper(maExtract);
    const mapMap: U[] = monMapper.map(transformApp);
    return this.pure2(mapMap);
  }

  bindFlip<U extends Array<A>>(transformApp: (val: A) => Monadic<U>, ma: Monadic<A>): Monadic<U[]> {
    return this.bind(ma, transformApp);
  }

  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): Functorial<U[]> {
    return this.applicative.apply(transformApp, fa);
  }

  fmap<U extends A[]>(transform: (value: A) => U, fa: Functorial<A>): Functorial<U[]> {
    return this.applicative.fmap(transform, fa);
  }

  return<U>(value: U): Functorial<U> {
    return this.applicative.return(value);
  }

  extract(): Mapper<A> {
    return this.applicative.extract();
  }

  observe(): Observable<Ts<A>> {
    return this.applicative.observe();
  }

}
