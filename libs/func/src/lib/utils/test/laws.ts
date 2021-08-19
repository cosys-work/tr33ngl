import { Functorial, Monad } from "@cosys/func";

export class MonadicLaws<A extends []> extends Monad<A> {
  readonly monad!: Monad<A>;

  constructor(ma: Monad<A>) {
    super(ma.value);
    this.monad = ma;
  }

  //**
  // @doc pure is a left-identity with respect to bind
  // */
  firstLaw(a: A, fun = (v: A ) => this.return(v)): () => void {
    const ret: () => Functorial<A> = () => this.monad.return<A>(a);
    const fx: () => Functorial<A> = () => fun(a);
    const binder = () => this.monad.bind<A[]>(
      ret(),
      () => fx()
    );
    return () => binder() === fx();
  }

  //**
  // @doc pure is a right-identity with respect to bind
  // */
  secondLaw(a: A, fun = (v: A ) => this.return(v)): () => void {
    const ret: () => Functorial<A> = () => this.return(a);
    const fx: () => Functorial<A> = () => fun(a);
    const binder = () => this.monad.bind<A[]>(
      fx(),
      () => ret()
    );
    return () => binder() === this.return(a);
  }

  //**
  // @doc associativity for >>= i.e. bind.
  // Note that these are true not just for the 0th index monads in the results.
  // */
  thirdLaw(a: A, fun = (v: A ) => this.return(v), gun = (val: A) => this.return(val)) {
    const monadX = this.return(a);
    const xBindF: () => Functorial<A[]> =
      () => this.monad.bind<A>(
        monadX,
        () => fun(a)
      );

    const xBindFBindG: () => Functorial<A[]> =
      () => this.monad.bind<A>(new Monad<A>(xBindF().value[0]), () => gun(a));

    const lambdaFv = (v: A) => fun(v);
    const lambdaGw = (w: A) => gun(w);

    const lambdaFvBindG = (v: A) => this.monad.bind<A>(lambdaFv(v), lambdaGw);

    const xBindLambdaFvBindG = (u: A) => this.monad.bind<A>(
      monadX,
      () => new Monad<A>(lambdaFvBindG(u).value[0])
    );

    return () => xBindFBindG() === xBindLambdaFvBindG(a)
  }
}
