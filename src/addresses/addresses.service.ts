import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';
import { CreateAddressDto } from './dto/create-address.dto';
import { firstValueFrom } from 'rxjs';
import { AxiosResponse } from 'axios';
import { asdb } from 'data/data';

@Injectable()
export class AddressesService {
  private baseUrlEtherscan = process.env.ETHERSCAN_API_BASE;
  private apiKey = process.env.ETHERSCAN_API_KEY;

  constructor(private readonly httpService: HttpService) {}

  async create(createAddressDto: CreateAddressDto) {
    const addresses = asdb.addresses.map((address) => address.id);
    if (addresses.includes(createAddressDto.id))
      return new Error('Already exists');
    const address = {
      id: createAddressDto.id,
      favorite: false,
      isOld: await this.isOld(createAddressDto.id),
    };
    asdb.addAddress(address);
    return `This action adds a new address`;
  }

  private async getFirstNormalTransaction(
    id: string,
  ): Promise<{ timeStamp: string }> {
    try {
      const res: AxiosResponse = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrlEtherscan}?module=account&action=txlist&address=${id}&startblock=0&endblock=99999999&page=1&offset=1&sort=asc&apikey=${this.apiKey}`,
        ),
      );
      if (res?.data?.status === '1') return res.data.result[0];
      else throw new Error(res.data.message);
    } catch (error) {
      throw error;
    }
  }

  private async isOld(id: string) {
    const oneYearAgo = new Date(
      (new Date().getFullYear() - 1).toString(),
    ).getTime();
    const isOld =
      Number((await this.getFirstNormalTransaction(id)).timeStamp) < oneYearAgo;
    return isOld;
  }

  findAll() {
    return {
      messagge: `This action returns all addresses`,
      addresses: asdb.addresses,
    };
  }

  remove(id: string) {
    asdb.deleteAddress(id);
    return `This action removes #${id} address`;
  }

  favorite(id: string, favorite: boolean) {
    asdb.updateFavorite(id, favorite);
    return `This action add o quit to favorite #${id} address`;
  }

  async getBalance(
    id: string,
  ): Promise<{ balance: string; currency: string; eth: string }> {
    try {
      const res: AxiosResponse = await firstValueFrom(
        this.httpService.get(
          `${this.baseUrlEtherscan}?module=account&action=balance&address=${id}&tag=latest&apikey=${this.apiKey}`,
        ),
      );
      if (res?.data?.status === '1') {
        const exchangeValues = asdb.ethPrices;
        return {
          currency: asdb.currentCurrency,
          balance: (
            Number(ethers.formatEther(res.data.result)) *
            exchangeValues[asdb.currentCurrency]
          ).toFixed(2),
          eth: ethers.formatEther(res.data.result),
        };
      } else throw new Error(res.data.message);
    } catch (error) {
      throw error;
    }
  }
}
