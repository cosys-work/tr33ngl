import { BehaviorSubject } from "rxjs";

export interface Cartesian {
  cols: number;
  rows: number;
}

export interface Card {
  title: string;
  cols: number;
  rows: number;
  contents: Record<string, unknown>;
}

export interface Grid {
  cards: Card[];
  isSmall: boolean;
}

export type GridMaker = (forceSmallness?: boolean) => BehaviorSubject<Grid>;
