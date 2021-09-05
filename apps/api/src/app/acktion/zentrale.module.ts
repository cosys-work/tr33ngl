import { Module } from '@nestjs/common';
import { ZentraleService } from './zentrale.service';

@Module({
  providers: [ZentraleService],
  exports: [ZentraleService]
})
export class ZentraleModule {}
