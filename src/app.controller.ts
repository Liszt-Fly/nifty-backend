import { Body, Controller, Post } from '@nestjs/common';
import { LoginForm } from './dto/LoginForm';
import { LoginService } from './login/login.service';

@Controller()
export class AppController {
  constructor(private readonly loginService: LoginService) {}

  @Post('api')
  async login(@Body() loginForm: LoginForm): Promise<Boolean> {
    let res = await this.loginService.Login(
      loginForm.email,
      loginForm.password,
    );
    if (res) return true;
    return false;
  }
  @Post('register')
  async register(@Body() registerForm: LoginForm): Promise<String> {
    await this.loginService.Register(registerForm.email, registerForm.password);
    console.log('ok');
    return 'success';
  }
}
