import { Injectable } from '@nestjs/common';
import { EntityManager, Repository } from 'typeorm';
import { AccessLog } from '../entities/access-log.entity';
import { InjectEntityManager, InjectRepository } from '@nestjs/typeorm';
import { User } from '../entities';

@Injectable()
export class AccessLogRepository extends Repository<AccessLog> {
  constructor(
    @InjectRepository(AccessLog)
    private readonly repo: Repository<AccessLog>,
    @InjectEntityManager()
    private readonly entityManager: EntityManager,
  ) {
    super(repo.target, repo.manager);
  }

  async createAccessLog(user: User, ua: string, endpoint: string, ip: string) {
    const accessLog = new AccessLog();
    accessLog.user = user;
    accessLog.ua = ua;
    accessLog.endpoint = endpoint;
    accessLog.ip = ip;
    accessLog.accessedAt = new Date(Date.now());
    await this.save(accessLog);
  }
}
