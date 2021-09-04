import {FixedLenListoid} from "@cosys/func";
import {HyperGraph} from "../hyper.defn";

export const suc = (n: number) => n + 1;
export type Zero = 0;
export type Nat = Zero | typeof suc;

export interface Dim {
  dim: Nat;
}

export interface Pointed extends Dim {
  vec0: FixedLenListoid<Number, Number>;
}

export interface Directed extends Pointed {
  vec1: (vec0: FixedLenListoid<Number, Number>) => FixedLenListoid<Number, Number>;
}

export type ULine = Pointed & Directed;

export type BSegment = [Pointed, Pointed];

export type QSlice = [[BSegment, BSegment, BSegment], ULine];

export type HSpace = [(q: QSlice) => QSlice];

export type HGHSpace = HyperGraph<QSlice, HSpace>;
