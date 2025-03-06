import { BeforeInsert, BeforeUpdate, Column } from 'typeorm';

export class AuditableEntity {
  @Column({ name: 'create_user' })
  createUser: string;

  @Column({ name: 'create_dt' })
  createDt: Date;

  @Column({ name: 'update_user' })
  updateUser: string;

  @Column({ name: 'update_dt' })
  updateDt: Date;

  @BeforeInsert()
  createAuditableFields() {
    const user = 'UNKNOWN';
    const now = new Date();

    this.createDt = now;
    this.updateDt = now;
    this.createUser = user;
    this.updateUser = user;
  }

  @BeforeUpdate()
  updateAuditableFields() {
    const user = 'UNKNOWN';
    const now = new Date();

    this.updateDt = now;
    this.updateUser = user;
  }
}
