import { AlphaApplicative } from "./applicative";
import { Monad, Monadic } from "../mon/monad.defn";
import { Ts } from "../util";

export class AlphaMonad<T>
  extends AlphaApplicative<T>
  implements Monadic<T> {

  protected readonly monad!: Monadic<T>;

  constructor(t: T) {
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

}
