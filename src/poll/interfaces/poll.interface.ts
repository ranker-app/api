import { Auditable } from 'src/base/audit.interface';
import { User } from 'src/user/interfaces/user.interface';

export interface Poll extends Auditable {
  image: string;
  content: string;
  slug: string;
  user?: User;
  // categories: Category[];
  // options: PollOption[];
  // comments: PollComment[];
}
