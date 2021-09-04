import { Applicative, Applicativity, FAM, Functorial, PFunc, Ts } from "@cosys/func";

export const joinOmega: <T>(fam: FAM<T>) =>
  <U>(ff: Functorial<U> | Functorial<Functorial<U>>) => PFunc<T, Functorial<U>>
  = <T>(fam: FAM<T>) => <U>(ff: Functorial<U> | Functorial<Functorial<U>>) => () => {
  return fam.join(ff);
};

export const fmapOmega: <T>(fam: FAM<T>) =>
  <U>(f: PFunc<T, U> | FAM<PFunc<T, U>>) => PFunc<T, FAM<U>>
  = <T>(fam: FAM<T>) => <U>(f: PFunc<T, U> | FAM<PFunc<T, U>>) => () => {
  return fam.fmap(f);
};

export const pureOmega: <T>(fam: FAM<T>) =>
  <U>(u: U) => PFunc<T, FAM<U>>
  = <T>(fam: FAM<T>) => <U>(u: U) => () => {
  return fam.pure(u);
};

export const idOmega: <T>(t: FAM<T>) => PFunc<T, FAM<T>>
  = <T>(t: FAM<T>) => () => {
  return t.pure(t.u);
};

export const applyOmega: <T>(t: Ts<T>) => <U>(f: Applicativity<(a: T) => U>) =>
  PFunc<T, Applicativity<U>>
  = <T>(t: Ts<T>) => <U>(f: Applicativity<(a: T) => U>) => () => {
  return new Applicative(t).apply(f);
};
