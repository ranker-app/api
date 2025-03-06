import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './interfaces/user.interface';
import { AuditableEntity } from '../base/audit.entity';
import { UserStatus } from './enums/user-status.enum';

@Entity('user')
export class UserEntity extends AuditableEntity implements User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'nick_name' })
  nickName: string;

  @Column({ name: 'email' })
  email: string;

  @Column({
    name: 'status',
    type: 'enum',
    enum: UserStatus,
    default: UserStatus.ACTIVE,
  })
  status: UserStatus;
}
