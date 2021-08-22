import { AlphaApplicative } from "./applicative";
import { Monad, Monadic } from "../mon/monad.defn";

export class AlphaMonad<T>
  extends AlphaApplicative<T>
  implements Monadic<T> {

  protected readonly monad!: Monadic<T>;

  constructor(t: T) {
    super(t);
    this.monad = new Monad(t);
  }

  bind<U>(ma: Monadic<T>, transformApp: (value: T) => Monadic<U>): Monadic<U> | Monadic<U>[] {
    return this.monad.bind(ma, transformApp);
  }

  return<U>(t: U): Monadic<U> {
    return this.monad.return(t);
  }

}
