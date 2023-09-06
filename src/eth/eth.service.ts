import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { asdb } from 'data/data';

@Injectable()
export class EthService {
  private coingeckoBaseUrl = process.env.COINGECKO_API_BASE;

  constructor(private readonly httpService: HttpService) {}

  async getExchangeRates() {
    try {
      return asdb.ethPrices;
    } catch (error) {
      throw error;
    }
  }

  async updateToRealExchangeRates() {
    try {
      const res: AxiosResponse = await firstValueFrom(
        this.httpService.get(
          `${this.coingeckoBaseUrl}/v3/simple/price?vs_currencies=usd,eur&ids=ethereum`,
        ),
      );
      asdb.updateEthPrices(res.data['ethereum'][asdb.currentCurrency]);
      return { message: 'Real rates setyed' };
    } catch (error) {
      throw error;
    }
  }

  editExchangeRates(value: number) {
    asdb.updateEthPrices(value);
    return 'Edited';
  }
}
