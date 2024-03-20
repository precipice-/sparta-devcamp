import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UserRepository } from '../repositories';
import { CreateUserDto } from '../dto/create-user.dto';
import { User } from '../entities';
import * as argon2 from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly userRepo: UserRepository) {}

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
}
