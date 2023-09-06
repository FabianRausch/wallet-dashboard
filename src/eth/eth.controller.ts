import { Body, Controller, Get, Put } from '@nestjs/common';
import { EthService } from './eth.service';

@Controller('eth')
export class EthController {
  constructor(private readonly ethService: EthService) {}

  @Get('/rates')
  getExchangeRates() {
    return this.ethService.getExchangeRates();
  }

  @Put('/real-rates')
  updateToRealExchangeRates() {
    return this.ethService.updateToRealExchangeRates();
  }

  @Put('/rates')
  editExchangeRates(@Body() { value }: { value: number }) {
    return this.ethService.editExchangeRates(value);
  }
}
