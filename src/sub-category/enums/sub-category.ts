import { DrinksSubcategory } from '@app/product/enums/ sub-category-for-drinks';
import { CheesesSubcategory } from '@app/product/enums/sub-category-for-cheeses';
import { CraftFoodSubcategory } from '@app/product/enums/sub-category-for-craft-food';
import { DairySubcategory } from '@app/product/enums/sub-category-for-dairy';
import { EggsSubcategory } from '@app/product/enums/sub-category-for-eggs';
import { FruitsAndVegetablesSubcategory } from '@app/product/enums/sub-category-for-fruits-vegetables';
import { GrocerySubcategory } from '@app/product/enums/sub-category-for-grocery';
import { MeatSubcategory } from '@app/product/enums/sub-category-for-meat';

export const SubCategoryEnum = {
  ...DrinksSubcategory,
  ...CheesesSubcategory,
  ...CraftFoodSubcategory,
  ...DairySubcategory,
  ...EggsSubcategory,
  ...FruitsAndVegetablesSubcategory,
  ...GrocerySubcategory,
  ...MeatSubcategory,
} as const;
