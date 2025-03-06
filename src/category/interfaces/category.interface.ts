import { Auditable } from 'src/base/audit.interface';

export interface Category extends Auditable {
  name: string;
  slug: string;
}
