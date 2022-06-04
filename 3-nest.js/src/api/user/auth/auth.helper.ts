import { HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";
import { TokenDecoded } from "src/interfaces";
import { Repository } from "typeorm";
import { User } from "../model/user.entity";
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthHelper {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    private readonly jwt: JwtService;
    constructor(jwt: JwtService) {
        this.jwt = jwt;
    }

    // dekodiranje jwt
    public async decode(token: string) : Promise<TokenDecoded> {
        const tokenData: TokenDecoded = await this.jwt.decode(token, null) as TokenDecoded;

        if(!tokenData || !tokenData.userId || typeof(tokenData.userId) !== 'number') { throw new Error('Token validation error!'); }
        return tokenData;
    }

    // nadji user-a preko dekorirane vrednosti tokena
    public async validateUser(decoded: TokenDecoded) : Promise<User> {
        return this.repository.findOne({ where: { id: decoded.userId } });
    }

    // generisanje tokena
    public generateToken(user: User) : string {
        return this.jwt.sign({ userId: user.id });
    }

    // validacija sifre
    public isPasswordValid(password: string, userPassword: string) : boolean {
        return bcrypt.compareSync(password, userPassword);
    }

    // sifriranje sifre
    public encodePassword(password: string) : string {
        const salt: string = bcrypt.genSaltSync(10); // 10 rundi
        return bcrypt.hashSync(password, salt);
    }

    // validacija tokena
    private async validate(token: string) : Promise<boolean | never> {
        const decoded: TokenDecoded = this.jwt.verify(token);
        if(!decoded) { throw new HttpException('Forbidden!', HttpStatus.FORBIDDEN); }

        const user: User = await this.validateUser(decoded);
        if(!user) { throw new UnauthorizedException(); }

        return true;
    }

}