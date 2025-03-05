import { Column } from 'typeorm';

export class Auditable {
  @Column({ name: 'create_user' })
  createUser: Date;

  @Column({ name: 'create_dt' })
  createDt: Date;

  @Column({ name: 'update_user' })
  updateUser: Date;

  @Column({ name: 'update_dt' })
  updateDt: Date;
}
