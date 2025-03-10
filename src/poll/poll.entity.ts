import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Poll } from './interfaces/poll.interface';
import { AuditableEntity } from '../base/audit.entity';
import { UserEntity } from '../user/user.entity';

@Entity('poll')
export class PollEntity extends AuditableEntity implements Poll {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'image' })
  image: string;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'slug' })
  slug: string;

  @Column({ name: 'user_id', nullable: false })
  userId: number;

  @ManyToOne(() => UserEntity, (user) => user.polls, {
    eager: true,
  })
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;

  // @Column({ name: 'image' })
  // categories: Category[];

  // options: PollOption[];
  // comments: PollComment[];
}
