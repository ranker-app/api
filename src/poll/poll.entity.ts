import { CategoryEntity } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../base/audit.entity';
import { UserEntity } from '../user/user.entity';
import { Poll } from './interfaces/poll.interface';

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

  @ManyToMany(() => CategoryEntity, { eager: true })
  @JoinTable({
    name: 'poll_category',
    joinColumn: { name: 'poll_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
  })
  categories: CategoryEntity[];

  // @Column({ name: 'image' })
  // categories: Category[];

  // options: PollOption[];
  // comments: PollComment[];
}
