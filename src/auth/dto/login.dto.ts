import { PublicUserDto } from '../../user/dto/public-user.dto';

export class LoginDto {
  token: string;
  user: PublicUserDto;
}
