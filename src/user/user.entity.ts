import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './interfaces/user.interface';

@Entity()
export class UserEntity implements User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  nickName: string;

  @Column()
  email: string;
}
