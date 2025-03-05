import { User } from '../interfaces/user.interface';

export class CreateUserDto implements User {
  firstName: string;
  lastName: string;
  isActive: boolean;
}
