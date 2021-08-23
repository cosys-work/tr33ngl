import { Listoid } from "@cosys/func";

export const $id = Symbol.for('id');
export const $di = Symbol.for('di');

export interface Nod {
  [key: string]: string;
  [$id]: Partial<Nod>;
  tag: string;
}

export interface Edg extends Partial<Nod> {
  [$id]: Partial<Nod>;
  [$di]: Listoid<Nod>;
  tag: string;
}

export type Nods = Nod[];
export type Edgs = Edg[];

export interface Gra {
  nodes: Nods;
  edges: Edgs;
}
