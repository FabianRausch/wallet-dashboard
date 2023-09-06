import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AddressesService } from './addresses.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('addresses')
export class AddressesController {
  constructor(private readonly addressesService: AddressesService) {}

  @Get()
  findAll() {
    return this.addressesService.findAll();
  }

  @Post('/add')
  create(@Body() createAddressDto: CreateAddressDto) {
    return this.addressesService.create(createAddressDto);
  }

  @Put('/favorite')
  favorite(@Body() { id, favorite }: { id: string; favorite: boolean }) {
    return this.addressesService.favorite(id, favorite);
  }

  @Delete('/detete/:id')
  remove(@Param('id') id: string) {
    return this.addressesService.remove(id);
  }

  @Get('/balance/:id')
  getBalance(@Param('id') id: string) {
    return this.addressesService.getBalance(id);
  }
}
