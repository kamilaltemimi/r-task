import { StarlinkViewModel } from './starlink-view-model.interface';

export interface StarlinkCategoryViewModel {
  divisibleBy3: StarlinkViewModel[];
  divisibleBy5: StarlinkViewModel[];
  isDivisibleBy3and5: StarlinkViewModel[];
  notDivisibleBy3And5: StarlinkViewModel[];
}
