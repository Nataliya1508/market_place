import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { BuyerService } from './buyer.service';

@Controller('buyers')
@ApiTags('Buyers')
export class BuyerController {
  constructor(private readonly buyerService: BuyerService) {
    
  }
}
