import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { AccessTokenRepository, UserRepository } from '../repositories';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);
  constructor(
    private readonly userRepo: UserRepository,
    private readonly accessTokenRepo: AccessTokenRepository,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const user = await this.userRepo.findOneByEamil(dto.email);
    if (user) {
      throw new HttpException(
        `${dto.email} already exist`,
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await argon2.hash(dto.password);
    return this.userRepo.createUser(dto, hashedPassword);
  }
  async validateUser(id: string, jti: string): Promise<User> {
    const [user, token] = await Promise.all([
      this.userRepo.findOneBy({ id }),
      this.accessTokenRepo.findOneByJti(jti),
    ]);
    if (!user) {
      this.logger.error(`user ${id} not found`);
      throw new HttpException('User Not Found', HttpStatus.BAD_REQUEST);
    }
    if (!token) {
      this.logger.error(`jti ${jti} token is revoked`);
      throw new HttpException('Revoked Token', HttpStatus.BAD_REQUEST);
    }
    return user;
  }
}
