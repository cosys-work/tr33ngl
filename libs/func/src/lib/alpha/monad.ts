import { AlphaApplicative } from "./applicative";
import { Monad, Monadic } from "../mon/monad.defn";
import { Ts } from "../util";
import { FAM, UFunc } from "../func/tion/function.defn";

export class AlphaMonad<T>
  extends AlphaApplicative<T>
  implements Monadic<T> {

  protected readonly monad!: Monadic<T>;

  constructor(t: Ts<T>) {
    super(t);
    this.monad = new Monad(t);
  }

  bind<U>(
    transformApp: (value: Ts<T>) => Monadic<U>
  ): Monadic<U> {
    return this.monad.bind(transformApp);
  }

  pure<U>(u: U): Monadic<U> {
    return this.monad.pure(u);
  }

  fmap<U>(  f:  UFunc<T, U> | FAM<UFunc<T, U>>): FAM<U> {
    return this.monad.fmap(f);
  }

}
