import { Test, TestingModule } from '@nestjs/testing';
import { SubSubcategoriesController } from './sub-subcategories.controller';

describe('SubSubcategoriesController', () => {
  let controller: SubSubcategoriesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubSubcategoriesController],
    }).compile();

    controller = module.get<SubSubcategoriesController>(SubSubcategoriesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
