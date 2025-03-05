import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { envs } from 'src/config/envs';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('login')
  async login(@Payload() loginDto: LoginDto){
    console.log(envs.jwt_secret, ' <==')
    return await this.authService.login(loginDto)
  }
  @MessagePattern('register')
 async register(@Payload() registerDto: RegisterDto){
    return await this.authService.register(registerDto)
  }
  @MessagePattern('verify-token')
  async verifyToken(@Payload() token: string){
    return await this.authService.verifyToken(token)
  }
}
