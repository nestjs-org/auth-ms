import { HttpCode, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaClient } from 'src/prisma-client/prisma-client';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { RpcException } from '@nestjs/microservices';
import { compare, hashSync } from "bcrypt";
import { users } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { envs } from 'src/config/envs';
@Injectable()
export class AuthService {
    constructor(private readonly PrismaClient: PrismaClient, 
        private jsonwebtoken: JwtService
    ) { }

    async login(login: LoginDto) {

        const { email, password, name, id } = await this.PrismaClient.users.findFirst({ where: { email : login.email} }) as users;
        if (!id) throw new RpcException({ error: HttpStatus.NOT_FOUND, message: "Error: user not found" });

        const validate_password = compare(login.password, password);
        if (!validate_password) throw new RpcException({ error: HttpStatus.BAD_REQUEST, message: "Error: Password incorrect" });
        const token = this.jsonwebtoken.sign({sub: id, email, name});
        return {
            id,
            name,
            email,
            token
        }

    }
    async register(registerDto: RegisterDto) {
        const { email, password } = registerDto;
        await this.checkIfUserEmailExist(email);
        return await this.PrismaClient.users.create({
            data: {
                ...registerDto,
                password: hashSync(password, 10),
            }
        })
    }

    async checkIfUserEmailExist(email: string): Promise<users> {
        const doEmailExistOnDb = await this.PrismaClient.users.findFirst({ where: { email } }) as users;
        if (doEmailExistOnDb) throw new RpcException({
            error: HttpStatus.CONFLICT,
            message: "Error: email already exist!",
        })
        return doEmailExistOnDb
    }

   async verifyToken(token: string) {

        return await this.jsonwebtoken.verifyAsync(token,{secret:envs.jwt_secret}).catch(err =>{
            throw new RpcException('token no valid')
            
        })
    }
}
