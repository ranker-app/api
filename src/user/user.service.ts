import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './user.entity';
import { User } from './interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const newUser: User = this.usersRepository.create(createUserDto);

    return this.usersRepository.save(newUser);
  }

  async findOneOrThrow(id: number): Promise<User> {
    const user = await this.usersRepository.findOneBy({ id });

    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }

  async update(id: number, createUserDto: CreateUserDto): Promise<User> {
    const foundUser = await this.findOneOrThrow(id);

    const newUser = { ...foundUser, ...createUserDto };

    await this.usersRepository.update(id, newUser);

    return newUser;
  }

  async delete(id: number): Promise<any> {
    await this.findOneOrThrow(id);

    return await this.usersRepository.delete(id);
  }
}
