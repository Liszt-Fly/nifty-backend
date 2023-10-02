import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginForm, RegisterForm } from 'src/dto/LoginForm';
import { AuthService } from './auth.service';
import { EmailService } from 'src/email/email.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authServcie: AuthService,
    private readonly emailService: EmailService,
  ) {}
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
      registerForm.verifyCode,
    );
    return 'success';
  }
  @UseGuards(AuthGuard('jwt'))
  @Get('validate')
  async checkTokenValidate() {
    return true;
  }
  @Post('sendMessage')
  async sendVerifyCodeMessage(@Body() body: any) {
    this.emailService.send(body.email);
  }
}
