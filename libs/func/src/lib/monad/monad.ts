import { Applicative, Applicativity, Functorial, Mapper, MonadMapper, Ts } from "@cosys/func";
import { Observable } from "rxjs";

export interface Monadic<A> extends Applicativity<A> {
  bind<U extends Array<A>>(ma: Functorial<A>, transformApp: (value: A) => Functorial<U>): Functorial<U[]>;
}

export class Monad<A> implements Monadic<A> {

  readonly type: string = "Monad";
  readonly value!: A;
  readonly applicative!: Applicative<A>;

  constructor(value: A) {
    this.value = value;
    this.applicative = new Applicative<A>(value);
  }

  bind<U extends Array<A>>(ma: Functorial<A>, transformApp: (val: A) => Functorial<U>): Functorial<U[]> {
    const maExtract: A[] = ma.extract().map(v => v);
    const monMapper: MonadMapper<A> = new MonadMapper(maExtract);
    const mapMap: U[] = monMapper.map(transformApp);
    return this.returns(mapMap);
  }

  bindFlip<U extends Array<A>>(transformApp: (val: A) => Functorial<U>, ma: Functorial<A>): Functorial<U[]> {
    return this.bind(ma, transformApp);
  }

  returns<U>(us: U[]): Functorial<U[]> {
    return new Monad<U[]>(us);
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
