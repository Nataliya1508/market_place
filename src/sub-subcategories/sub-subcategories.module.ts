import { Module } from '@nestjs/common';

import { SubSubcategoriesService } from './sub-subcategories.service';

@Module({
  providers: [SubSubcategoriesService],
})
export class SubSubcategoriesModule {}
