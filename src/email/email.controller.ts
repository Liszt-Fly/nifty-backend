import { Body, Controller, Get, Post, Req } from '@nestjs/common';
import { EmailService } from './email.service';
import { emailDto } from 'src/dto/ValidateDto';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('validation')
  verify(@Body() validate: emailDto) {
    return this.emailService.validate(validate.account, validate.verifyCode);
  }
}
