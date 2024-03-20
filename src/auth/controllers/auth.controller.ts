import { SignupResDto } from '../dto/signup-res.dto';
import { UserService } from '../services/user.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<SignupResDto> {
    const user = await this.userService.createUser(createUserDto);
    return {
      id: user.id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      password: user.password,
    };
  }
}
