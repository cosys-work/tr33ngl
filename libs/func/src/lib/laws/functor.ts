import { fmapOmega, Functor, Functorial, idOmega, joinOmega, PFunc, Ts } from "@cosys/func";

export class FunctorLaws<T> {

  private readonly seedFunctor: Functorial<T>;
  readonly join: <U>(
    ff: Functorial<unknown> | Functorial<Functorial<unknown>>
  ) => PFunc<T, Functorial<U>>;
  readonly fmap: <U>(f: (a: T) => U) => PFunc<T, Functorial<U>>;
  readonly id: PFunc<T, Functorial<T>>;

  constructor(t: Ts<T>) {
    this.seedFunctor = new Functor<T>(t);
    this.join = joinOmega(this.seedFunctor);

    this.fmap = fmapOmega(this.seedFunctor);

    this.id = idOmega(this.seedFunctor);
  }

  // Functors must preserve identity morphisms
  firstLaw<U>() {
    const fmapId = this.fmap(this.id);
    const fMapIdFlat = this.join(fmapId());
    return fMapIdFlat() === this.id();
  }

  // Functors must preserve composition of morphisms
  secondLaw<U>(f: (t: T) => U, g: (u: U) => unknown, u: U) {
    const gAfterF: (t: T) => unknown = (t: T) => g(f(t));
    const fmapOfGAfterF:  PFunc<T, Functorial<unknown>> = this.fmap(gAfterF);
    const fmapOfF: PFunc<T, Functorial<U>> = this.fmap(f);
    const gFmap = fmapOmega(new Functor(u));
    const fmapOfG: PFunc<U, Functorial<unknown>> = gFmap(g);

    return fmapOfGAfterF() === fmapOfG(fmapOfF().u)
  }
}
