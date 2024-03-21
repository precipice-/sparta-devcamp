import { BaseEntity } from 'src/common/entity/base.entity';
import { Column, Entity, OneToMany, Relation } from 'typeorm';
import { AccessToken } from './access-token.entity';
import { RefreshToken } from './refresh-token.entity';
import { AccessLog } from './access-log.entity';

@Entity()
export class User extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar', length: 50 })
  phone: string;

  @Column({ type: 'varchar' })
  password: string;

  @OneToMany(() => AccessToken, (token) => token.user)
  accessToken: Relation<AccessToken[]>;

  @OneToMany(() => RefreshToken, (token) => token.user)
  refreshToken: Relation<RefreshToken[]>;

  @OneToMany(() => AccessLog, (log) => log.user)
  accessLogs: Relation<AccessLog[]>;
}
