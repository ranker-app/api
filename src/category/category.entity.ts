import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { Category } from './interfaces/category.interface';
import { AuditableEntity } from '../base/audit.entity';

@Entity('category')
export class CategoryEntity extends AuditableEntity implements Category {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'slug' })
  slug: string;
}
