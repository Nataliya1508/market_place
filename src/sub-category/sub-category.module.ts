import { Module } from '@nestjs/common';

import { SubCategoryService } from './sub-category.service';

@Module({
  providers: [SubCategoryService],
})
export class SubCategoryModule {}
