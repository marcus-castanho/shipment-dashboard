import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDTO } from './dto/signin.dto';
import { AuthGuard } from './auth.guard';
import type { CustomRequest } from './types';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signin')
  signIn(@Body() signInDto: SignInDTO) {
    return this.authService.signIn(signInDto.id);
  }

  @UseGuards(AuthGuard)
  @Get('data')
  getProfile(@Request() req: CustomRequest) {
    return req.userId;
  }
}
