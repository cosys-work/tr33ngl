import { Monad, Monadic } from "@cosys/func";

export class MonadicLaws<A extends []> extends Monad<A> {
  readonly monad!: Monad<A>;

  constructor(ma: Monad<A>) {
    super(ma.value);
    this.monad = ma;
  }


  //**
  // @doc pure is a left-identity with respect to bind
  // */
  firstLaw(a: A, fun = (v: A ) => this.pure(v)): () => void {
    const ret: () => Monadic<A> = () => this.monad.pure<A>(a);
    const fx: () => Monadic<A> = () => fun(a);
    const binder = () => this.monad.bind<A[]>(
      ret(),
      () => fx()
    );
    return () => binder() === fx();
  }

  //**
  // @doc pure is a right-identity with respect to bind
  // */
  secondLaw(a: A, fun = (v: A ) => this.pure(v)): () => void {
    const ret: () => Monadic<A> = () => this.pure(a);
    const fx: () => Monadic<A> = () => fun(a);
    const binder = () => this.monad.bind<A[]>(
      fx(),
      () => ret()
    );
    return () => binder() === this.pure(a);
  }

  //**
  // @doc associativity for >>= i.e. bind.
  // Note that these are true not just for the 0th index monads in the results.
  // */
  thirdLaw(a: A, fun = (v: A ) => this.pure(v), gun = (val: A) => this.pure(val)) {
    const monadX = this.pure(a);
    const xBindF: () => Monadic<A[]> =
      () => this.monad.bind<A>(
        monadX,
        () => fun(a)
      );

    const xBindFBindG: () => Monadic<A[]> =
      () => this.monad.bind<A>(xBindF()[0], () => gun(a));

    const lambdaFv = (v: A) => fun(v);
    const lambdaGw = (w: A) => gun(w);

    const lambdaFvBindG = (v: A) => this.monad.bind<A>(lambdaFv(v), lambdaGw);

    const xBindLambdaFvBindG = (u: A) => this.monad.bind<A>(
      monadX,
      () => lambdaFvBindG(u)[0]
    );

    return () => xBindFBindG() === xBindLambdaFvBindG(a)
  }
}
