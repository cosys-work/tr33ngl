import { Applicative, Applicativity } from "./applicative";
import { Nominator } from "../nominators";
import { Functorial } from "./functor";
import { MonadMapper } from "../mappable";


export interface Monadic<A> extends Applicativity<A>{
  bind<U extends Array<A>>(ma: Monadic<A>, transformApp: (value: A) => Monadic<U>): Monadic<U[]>;
}

export class Monad<A> extends Applicative<A> implements Monadic<A>, Applicativity<A>, Functorial<A>, Nominator<A> {

  readonly type: string = "Monad";
  readonly value!: A;
  readonly applicative!: Applicative<A>;

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

  constructor(value: A) {
    super(value);
    this.value = value;
    this.applicative = new Applicative<A>(value);
  }

}
