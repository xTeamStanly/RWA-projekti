import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { UserRoles } from "src/enums";
import { PurchaseIDNamePrice } from "src/interfaces";
import { DeleteResult, InsertResult, Repository } from "typeorm";
import { getAllUserPurchases } from "../configuration/configuration.queries";
import { Configuration } from "../configuration/model/configuration.entity";
import { User } from "../user/model/user.entity";
import { PurchaseCreateDto } from "./model/purchase.dto.create";
import { PurchaseDeleteDto } from "./model/purchase.dto.remove";
import { Purchase } from "./model/purchase.entity";

@Injectable()
export class PurchaseService {
    @InjectRepository(Purchase)
    private readonly repository: Repository<Purchase>;

    @InjectRepository(Configuration)
    private readonly configurationRepository: Repository<Configuration>;

    public async createPurchase(body: PurchaseCreateDto, req: Request) : Promise<boolean> | never {
        const user: User = req.user as User;

        const configuration: Configuration = await this.configurationRepository.findOne({ where: { id: body.id } });
        if(!configuration) { throw new Error('Configuration not found!'); }

        const purchase: Purchase = new Purchase();
        purchase.user = user;
        purchase.configuration = configuration;
        purchase.date = new Date();

        let result: Purchase = await this.repository.save(configuration);
        if(result) { return true; }

        return false;
    }

    public async getPurchases(id: number, req: Request) : Promise<PurchaseIDNamePrice[]> | never {
        if(!id || typeof(id) !== 'number' || id <= 0) { throw new Error('Invalid ID!'); }

        const user: User = req.user as User;
        if(user.id === id || user.role === UserRoles.ADMINISTRATOR) {

            const result: PurchaseIDNamePrice[] = await this.repository.query(getAllUserPurchases);
            if(Array.isArray(result)) { return result; }

            throw new Error('Database query error!');

        } else {
            throw new Error('Unauthorised!');
        }
    }

    public async removePurchase(body: PurchaseDeleteDto, req: Request) : Promise<boolean> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let result: DeleteResult = await this.repository.delete(body.id);
        return !!result.affected;
    }
}