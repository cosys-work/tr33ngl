import { Monad, Monadic, Ts } from "@cosys/func";

export class MonadicLaws<A> {

  //**
  // @doc return is a left-identity with respect to bind
  // */
  firstLaw<U>(a: A, h: (a: Ts<A>) => Monadic<U>): boolean {
    const monad: Monadic<A> = new Monad<A>(a);
    const retA: Monadic<A> = monad.pure(a);

    const retABindH: Monadic<U> = retA.bind(h);
    const ha: Monadic<U> = h(a);

    return ha === retABindH;
  }

  //**
  // @doc return is a right-identity with respect to bind
  // */
  secondLaw(a: Ts<A>): boolean {
    const m: Monadic<A> = new Monad<A>(a);
    const mBindRet: Monadic<Ts<A>> = m.bind(m.pure);
    return mBindRet === m;
  }

  //**
  // @doc associativity for bind.
  // Note that these are true not just for the 0th index monads in the results.
  // */
  thirdLaw<U>(a: Ts<A>, h: (a: Ts<U>) => Monadic<unknown>, g: (a: Ts<A>) => Monadic<U>) {
    const m = new Monad<A>(a);
    const mBindG: Monadic<U> = m.bind(g);

    const lambdaG: (aa: Ts<A>) => Monadic<U> = (aa: Ts<A>) => g(aa);
    const lambdaGBindH: (aa: Ts<A>) => Monadic<unknown> = (_: Ts<A>) => lambdaG(a).bind(h);

    const mBindGBindH: Monadic<unknown> = mBindG.bind(h);
    const mBindLambdaGBindH: Monadic<unknown> = m.bind(lambdaGBindH);

    return mBindGBindH === mBindLambdaGBindH;
  }
}
