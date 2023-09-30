import { Body, Controller, Post } from '@nestjs/common';
import { LoginForm, RegisterForm } from 'src/dto/LoginForm';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authServcie: AuthService) {}
  @Post('login')
  async login(@Body() loginForm: LoginForm) {
    return await this.authServcie.Login(loginForm.email, loginForm.password);
  }
  @Post('register')
  async register(@Body() registerForm: RegisterForm): Promise<String> {
    await this.authServcie.Register(
      registerForm.email,
      registerForm.password,
      registerForm.username,
    );
    return 'success';
  }
}
