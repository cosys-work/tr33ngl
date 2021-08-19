import { Functorial, Mapper, Monad, Monadic, Nominator, Ts } from "@cosys/func";
import { Observable } from "rxjs";

export class Listoid<A extends Array<unknown>> implements Monadic<A>, Nominator<A> {
  readonly type: "Listoid" = "Listoid";
  readonly value!: A;
  readonly monad!: Monad<A>;

  constructor(value: A) {
    this.value = value;
    this.monad = new Monad<A>(value);
  }

  apply<U>(transformApp: Functorial<(value: A) => U>, fa: Functorial<A>): Functorial<U[]> {
    return this.monad.apply(transformApp, fa);
  }

  bind<U extends Array<A>>(ma: Functorial<A>, transformApp: (value: A) => Functorial<U>): Functorial<U[]> {
    return this.monad.bind(ma, transformApp);
  }

  extract(): Mapper<A> {
    return this.monad.extract();
  }

  fmap<U extends Array<A>>(transform: (value: A) => U, fa: Functorial<A>): Functorial<U[]> {
    return this.monad.fmap(transform, fa);
  }

  observe(): Observable<Ts<A>> {
    return this.monad.observe();
  }

  return<U>(value: U): Functorial<U> {
    return this.monad.return(value);
  }

}

export type ListoidV<A> = Pick<Listoid<A[]>, "value">;
