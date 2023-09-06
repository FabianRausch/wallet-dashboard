import { Module } from '@nestjs/common';
import { EthService } from './eth.service';
import { EthController } from './eth.controller';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [EthController],
  providers: [EthService],
})
export class EthModule {}
