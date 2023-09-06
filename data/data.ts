type Address = { id: string; favorite: boolean; isOld: boolean };

class Data {
  public currencies: string[] = ['usd', 'eur'];
  public currentCurrency: string = this.currencies[0];

  public ethPrices: { eur: number; usd: number } = { eur: 0, usd: 0 };

  public addresses: Address[] = [];

  // Currencies start
  getCurrencies() {
    return this.currencies;
  }

  editCurrentCurrency(currency: string) {
    this.currentCurrency = currency;
    return;
  }

  getCurrentCurrency() {
    return this.currentCurrency;
  }
  // Currencies end

  // Eth start
  updateEthPrices(value: number) {
    this.ethPrices[this.currentCurrency] = value;
    return;
  }
  // Eth end

  // Addresses start
  addAddress(address: Address) {
    this.addresses.push(address);
    return;
  }

  deleteAddress(id: string) {
    this.addresses = this.addresses.filter((address) => address.id != id);
    return;
  }

  updateFavorite(id: string, favorite: boolean) {
    this.addresses = this.addresses.map((address) =>
      address.id === id ? { ...address, favorite } : address,
    );
    return;
  }
  // Addresses end
}

export const asdb = new Data();
