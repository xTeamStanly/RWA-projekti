import { HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../model/user.entity";
import { AuthHelper } from "./auth.helper";
import { AuthLoginDto } from "./model/auth.dto.login";
import { AuthRegisterDto } from "./model/auth.dto.register";

@Injectable()
export class AuthService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    @Inject(AuthHelper)
    private readonly helper: AuthHelper;

    public async register(body: AuthRegisterDto) : Promise<User | never> {
        const { email, password, name, surname } : AuthRegisterDto = body;
        let user: User = await this.repository.findOne({ where: { email } });

        if(user) { throw new HttpException('User already exsists!', HttpStatus.CONFLICT); }

        user = new User();
        user.email = email;
        user.password = this.helper.encodePassword(password);
        user.name = name?.trim();
        user.surname = name?.trim();

        const result: User = await this.repository.save(user);
        delete result['password'];
        return result;
    }

    public async login(body: AuthLoginDto) : Promise<string | never> {
        const { email, password } : AuthLoginDto = body;
        const user: User = await this.repository.findOne({ where: { email } });

        if(!user) { throw new HttpException('User not found!', HttpStatus.NOT_FOUND); }

        const isPasswordValid: boolean = this.helper.isPasswordValid(password, user.password);
        if(!isPasswordValid) { throw new HttpException('User not found!', HttpStatus.NOT_FOUND); }

        return this.helper.generateToken(user);
    }

    public async refresh(user: User) : Promise<string> {
        return this.helper.generateToken(user);
    }
}