import { Injectable } from '@nestjs/common';
import { Message } from '@cosys/api-interfaces';
import {ZentraleService} from "./acktion/zentrale.service";

@Injectable()
export class AppService {

  constructor(public z: ZentraleService) {}

  getData(): Message {
    return { message: 'Welcome to api!' };
  }
}
