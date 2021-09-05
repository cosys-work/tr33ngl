import { Injectable } from '@nestjs/common';
import {Session, Response, Gra } from "@cosys/api-interfaces";

@Injectable()
export class ZentraleService {

  getSession(ackId: string): Session {
    // TO DO: check if ackId already is being served,
    // if it is do not create new, else create new id.
    return ({ackId});
  }

  getGraResp<T>(t: T): Response<Gra<T>> {
    const gra = { in: t, nodes: [t], edges: [t] };
    return ({ in: gra, id: "", io: [gra] });
  }
}
