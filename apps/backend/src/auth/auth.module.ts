import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { jwtModule } from './dependencies/jwt.module';

@Module({
  imports: [jwtModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
