import { Auditable } from 'src/base/audit.interface';
import { User } from '../interfaces/user.interface';

export class CreateUserDto implements Omit<User, keyof Auditable> {
  name: string;
  nickName: string;
  email: string;
}
