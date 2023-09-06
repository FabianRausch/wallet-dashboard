import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AddressesModule } from './addresses/addresses.module';
import { EthModule } from './eth/eth.module';
import { UserModule } from './user/user.module';
import { UserService } from './user/user.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [AddressesModule, EthModule, UserModule, ConfigModule.forRoot()],
  controllers: [AppController],
  providers: [AppService, UserService],
})
export class AppModule {}
