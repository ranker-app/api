import { Auditable } from 'src/base/audit.interface';
import { Poll } from '../interfaces/poll.interface';

export class CreatePollDto implements Omit<Poll, keyof Auditable> {
  image: string;
  content: string;
  slug: string;
}
