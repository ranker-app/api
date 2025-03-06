import { Auditable } from 'src/base/audit.interface';
import { Category } from '../interfaces/category.interface';

export class CreateCategoryDto implements Omit<Category, keyof Auditable> {
  name: string;
  slug: string;
}
