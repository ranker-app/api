import { User } from '../interfaces/user.interface';

export class PublicUserDto {
  id: number;
  name: string;
  nickName: string;
  email: string;

  static fromUser(user: User): PublicUserDto {
    const publicUser: PublicUserDto = new PublicUserDto();

    publicUser.id = user.id;
    publicUser.name = user.name;
    publicUser.nickName = user.nickName;
    publicUser.email = user.email;

    return publicUser;
  }
}
