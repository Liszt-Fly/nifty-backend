import { Body, Controller, Get, Post } from '@nestjs/common';
import { LoginForm, RegisterForm } from './dto/LoginForm';
import { AuthService } from './auth/auth.service';

@Controller('api')
export class AppController {
  constructor() {}
}
