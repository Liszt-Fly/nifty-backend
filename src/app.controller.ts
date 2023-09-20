import { Body, Controller, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { LoginForm } from './dto/LoginForm';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('api')
  getHello(@Body() loginForm: LoginForm): string {
    console.log(loginForm);
    return this.appService.getHello();
  }
}
