import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { UserRoles } from "src/enums";
import { MotherboardIDName } from "src/interfaces";
import { DeleteResult, Repository } from "typeorm";
import { User } from "../user/model/user.entity";
import { MotherboardCreateDto } from "./model/motherboard.dto.create";
import { MotherboardDeleteDto } from "./model/motherboard.dto.delete";
import { MotherboardUpdateDto } from "./model/motherboard.dto.update";
import { Motherboard } from "./model/motherboard.entity";
import { getAllMotherboardTitlesQuery } from "./motherboard.queries";

@Injectable()
export class MotherboardService {
    @InjectRepository(Motherboard)
    private readonly repository: Repository<Motherboard>;

    public async getMotherboard(id: number) : Promise<Motherboard> | never {
        if(!id || typeof(id) !== 'number' || id <= 0) { throw new Error('Invalid ID!'); }

        const found: Motherboard = await this.repository.findOne({ where: { id: id } });
        if(found) { return found; }

        throw new Error('Motherboard not found!');
    }

    public async newMotherboard(body: MotherboardCreateDto, req: Request) : Promise<Motherboard> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        const motherboard: Motherboard = new Motherboard();
        motherboard.manufacturer = body.manufacturer;
        motherboard.model = body.model;
        motherboard.price = body.price;

        return this.repository.save(motherboard);
    }

    public async editMotherboard(body: MotherboardUpdateDto, req: Request): Promise<Motherboard> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let manufacturer: string = body.manufacturer?.trim();
        let model: string = body.model?.trim();
        let price: number = body.price;

        if(!manufacturer && !model && !price) {
            throw new Error('Motherboard information did not change!');
        }

        let savedMotherboard: Motherboard = await this.repository.findOne({ where: { id: body.id } });
        if(!savedMotherboard) { throw new Error('Motherboard not found!'); }

        let shouldUpdate: boolean[] = [ true, true, true ];

        // ----- MANUFACTURER -----
        if(manufacturer && manufacturer.length > 0) {
            if(manufacturer === savedMotherboard.manufacturer) {
                shouldUpdate[0] = false;
            } else {
                savedMotherboard.manufacturer = manufacturer;
            }
        } else {
            shouldUpdate[0] = false;
        }

        // ----- MODEL -----
        if(model && model.length > 0) {
            if(model === savedMotherboard.model) {
                shouldUpdate[1] = false;
            } else {
                savedMotherboard.model = model;
            }
        } else {
            shouldUpdate[1] = false;
        }

        // ----- PRICE -----
        if(typeof(price) === 'number' && price > 0) {
            if(savedMotherboard.price === price) {
                shouldUpdate[2] = false;
            } else {
                savedMotherboard.price = price;
            }
        } else {
            shouldUpdate[2] = false;
        }

        for(let i = 0; i < 3; i++) {
            if(shouldUpdate[i] === true) {
                // desila se bar jedna promena, mozemo da azuriramo
                return this.repository.save(savedMotherboard);
            }
        }

        throw new Error('Motherboard information did not change!');
    }

    public async deleteMotherboard(body: MotherboardDeleteDto, req: Request) : Promise<boolean> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let result: DeleteResult = await this.repository.delete(body.id);
        return !!result.affected;
    }

    public async getAllMotherboards() : Promise<MotherboardIDName[]> | never {
        let results: MotherboardIDName[] = await this.repository.query(getAllMotherboardTitlesQuery);
        if(Array.isArray(results)) {
            return results;
        }

        throw new Error('Database query error!');
    }
}