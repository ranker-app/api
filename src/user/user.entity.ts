import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './interfaces/user.interface';
import { Auditable } from '../base/audit.entity';

@Entity('user')
export class UserEntity extends Auditable implements User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ name: 'email' })
  email: string;
}
