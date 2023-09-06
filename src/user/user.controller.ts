import { Controller, Get, Put, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/config/currency')
  getCurrency() {
    return this.userService.getCurrencyConfig();
  }

  @Put('/config/currency')
  changeCurrency(@Body() { currency }: { currency: string }) {
    return this.userService.changeCurrency(currency);
  }
}
