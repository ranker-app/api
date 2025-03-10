import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { AuditableEntity } from '../../base/audit.entity';
import { PollEntity } from '../poll.entity';

@Entity('poll_option')
export class PollOptionEntity extends AuditableEntity {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'content' })
  content: string;

  @Column({ name: 'poll_id', nullable: false })
  pollId: number;

  @ManyToOne(() => PollEntity, (poll) => poll.options)
  @JoinColumn({ name: 'poll_id' })
  poll: PollEntity;
}
