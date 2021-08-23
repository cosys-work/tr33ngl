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
    transformApp: (value: T) => Monadic<U>
  ): Monadic<Ts<U>> {
    return this.monad.bind(transformApp);
  }

  return<U>(t: Ts<U>): Monadic<Ts<U>> {
    return this.monad.return(t);
  }

}
