import { Auditable } from 'src/base/audit.interface';

export interface User extends Auditable {
  name: string;
  nickName: string;
  email: string;
}
