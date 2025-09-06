import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

export const jwtModule = JwtModule.registerAsync({
  imports: [ConfigModule],
  useFactory: (configService: ConfigService) => {
    return {
      secret: configService.get<string>('JWT_SECRET'),
      signOptions: { expiresIn: 60 * 60 * 24 },
    };
  },
  inject: [ConfigService],
});
