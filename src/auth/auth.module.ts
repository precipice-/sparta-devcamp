import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './controllers/auth.controller';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UserService } from './services/user.service';
import { UserRepository } from './repositories';

@Module({
  imports: [ConfigModule, TypeOrmModule.forFeature([User])],
  controllers: [AuthController],
  providers: [AuthService, UserService, UserRepository],
  exports: [UserService, AuthService, UserRepository],
})
export class AuthModule {}
