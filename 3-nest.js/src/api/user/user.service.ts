import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { Repository } from "typeorm";
import { UserUpdateDto } from "./model/user.dto.update";
import { User } from "./model/user.entity";

@Injectable()
export class UserService {
    @InjectRepository(User)
    private readonly repository: Repository<User>;

    public async updateUser(body: UserUpdateDto, req: Request) : Promise<User> {
        const user: User = req.user as User;

        let name: string = body.name?.trim();
        let surname: string = body.surname?.trim();

        if(!name && !surname) { throw new Error('User information did not change!'); }

        let shouldUpdate: boolean[] = [ true, true ];

        // ----- NAME -----
        if(name && name.length > 0) {
            if(user.name === name) {
                shouldUpdate[0] = false;
            } else {
                user.name = name;
            }
        } else {
            shouldUpdate[0] = false;
        }

        // ----- SURNAME -----
        if(surname && surname.length > 0) {
            if(user.surname === surname) {
                shouldUpdate[1] = false;
            } else {
                user.surname = surname;
            }
        } else {
            shouldUpdate[1] = false;
        }

        if(shouldUpdate[0] || shouldUpdate[1]) {
            const result: User = await this.repository.save(user);
            delete result['password'];
            delete result['role'];
            return result;
        }

        throw new Error('User information did not change!');
    }
}