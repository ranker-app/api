import { CreatePollCategoryDto } from './create-poll-category.dto';

export class CreatePollDto {
  image: string;
  content: string;
  slug: string;
  userId: number;
  categories: CreatePollCategoryDto[];
}
