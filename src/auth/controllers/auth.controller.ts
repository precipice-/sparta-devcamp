import { AuthService } from '../services/auth.service';
import { LoginReqDto, LoginResDto, RefreshReqDto } from '../dto';
import { SignupResDto } from '../dto/signup-res.dto';
import { UserService } from '../services/user.service';
import { CreateUserDto } from './../dto/create-user.dto';
import { Body, Controller, Post, Req } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

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

  @Post('login')
  async login(
    @Req() req,
    @Body() loginReqDto: LoginReqDto,
  ): Promise<LoginResDto> {
    const { ip, method, originalUrl } = req;
    const reqInfo = {
      ip,
      endpoint: `${method} ${originalUrl}`,
      ua: req.headers['user-agent'] || '',
    };

    return this.authService.login(
      loginReqDto.email,
      loginReqDto.password,
      reqInfo,
    );
  }

  // @Get('logout')
  // async logout(@Req() req): Promise<void> {
  //   console.log(req.cookies);
  //   const cookies = req.cookies;
  //   const accessToken = cookies['accessToken'];
  //   const refreshToken = cookies['refreshToken'];
  //   console.log('accessToken', accessToken);
  //   console.log('refreshToken', refreshToken);

  //   return this.authService.logout(
  //     `Bearer ${accessToken}`,
  //     `Bearer ${refreshToken}`,
  //   );
  // }

  @Post('refresh')
  async refresh(@Body() dto: RefreshReqDto): Promise<string> {
    return this.authService.refreshAccessToken(dto.refreshToken);
  }
}
