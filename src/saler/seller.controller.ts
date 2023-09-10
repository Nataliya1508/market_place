import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { SellerService } from './seller.service';

@Controller('sellers')
@ApiTags('Sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}
}
