import { Module } from '@nestjs/common';
import { ZentraleService } from './zentrale.service';

@Module({
  providers: [ZentraleService]
})
export class ZentraleModule {}
