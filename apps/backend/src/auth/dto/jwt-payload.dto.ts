import { IsNumber } from 'class-validator';

export class JwtPayloadDTO {
  constructor({ sub, iat, exp }: JwtPayloadDTO) {
    this.sub = sub;
    this.iat = iat;
    this.exp = exp;
  }

  @IsNumber()
  sub: number;

  @IsNumber()
  iat: number;

  @IsNumber()
  exp: number;
}
