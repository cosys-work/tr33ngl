import { Monad, Monadic, Ts } from "@cosys/func";

export class MonadicLaws<A> {

  //**
  // @doc return is a left-identity with respect to bind
  // */
  firstLaw<U>(a: A, h: (a: A) => Monadic<U>): boolean {
    const monad = new Monad(a);
    const retA = monad.return(a);
    const retABindH = retA.bind(h);
    return h(a) === retABindH;
  }

  //**
  // @doc return is a right-identity with respect to bind
  // */
  secondLaw(a: A): boolean {
    const m = new Monad(a);
    const mBindRet = m.bind(m.return);
    return mBindRet === m;
  }

  //**
  // @doc associativity for bind.
  // Note that these are true not just for the 0th index monads in the results.
  // */
  thirdLaw<U>(a: A, h: (a: Ts<U>) => Monadic<unknown>, g: (a: Ts<A>) => Monadic<U>) {
    const m = new Monad(a);
    const mBindG = m.bind(g);
    const mBindGBindH = mBindG.bind(h);

    const lambdaG = (aa: Ts<A>) => g(aa);
    const lambdaGBindH = (_: Ts<A>) => lambdaG(a).bind(h);
    const mBindLambdaGBindH = m.bind(lambdaGBindH);

    return mBindGBindH === mBindLambdaGBindH;
  }
}
