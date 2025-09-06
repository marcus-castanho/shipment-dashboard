import { IsNumber } from 'class-validator';

export class SignInDTO {
  @IsNumber()
  id: number;
}
