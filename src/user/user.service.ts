import { Injectable } from '@nestjs/common';
import { asdb } from 'data/data';

@Injectable()
export class UserService {
  getCurrencyConfig() {
    return {
      currencies: asdb.currencies,
      selected: asdb.currentCurrency,
    };
  }

  changeCurrency(currency: string) {
    if (!asdb.currencies.includes(currency))
      throw new Error('This currency is not disabled');
    asdb.editCurrentCurrency(currency);
    return `Changed to ${currency}`;
  }
}
