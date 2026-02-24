import { Body, Controller, Post, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { CreateUserDto } from './../users/dto/create-user.dto';
import { HashPasswordPipe } from './../users/pipes/hash-password.pipe';
import { UsersService } from './../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto);
    return this.authService.login(user);
  }

  @Post('register')
  async register(
    @Body() { password, ...createUserDto }: CreateUserDto,
    @Body('password', HashPasswordPipe) passwordHashed: string,
  ) {
    return this.authService.register({
      ...createUserDto,
      password: passwordHashed,
    });
  }
}
