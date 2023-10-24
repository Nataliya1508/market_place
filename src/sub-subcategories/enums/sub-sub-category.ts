import {
  MilkSubcategory,
  OtherDairySubcategory,
} from '@app/product/enums/sub-category-for-dairy';
import { OilSubcategory } from '@app/product/enums/sub-category-for-grocery';
import {
  FreshMeatSubcategory,
  SausagesSubcategory,
} from '@app/product/enums/sub-category-for-Meat';

export const SubSubCategoryEnum = {
  ...MilkSubcategory,
  ...OtherDairySubcategory,
  ...OilSubcategory,
  ...FreshMeatSubcategory,
  ...SausagesSubcategory,
} as const;
