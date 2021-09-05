import {Ts} from "@cosys/func";

export interface Message {
  message: string;
}


export interface Session {
  ackId: string;
  [key: string]: string;
}

export interface OpenConf {}

export interface LoginConf {}

export interface GrepConf {}

export interface Conf {}

export interface UIComp {}

export interface Login {}

export interface Grep {}

export interface SaveOrTrac {}

export interface ScanOrAuto {}

export interface Gra<T> {
  in: T,
  nodes: Ts<T>,
  edges: Ts<T>
}

export interface Response<T> {
  in: T,
  id: string;
  io: Ts<T>;
}

export interface Request<T> {
  in: T,
  id: string;
  is: Ts<T>;
}
