import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import {ZentraleModule} from "./acktion/zentrale.module";

@Module({
  imports: [ZentraleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
