import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { UserRoles } from "src/enums";
import { StorageIDName } from "src/interfaces";
import { DeleteResult, Repository } from "typeorm";
import { User } from "../user/model/user.entity";
import { StorageCreateDto } from "./model/storage.dto.create";
import { StorageDeleteDto } from "./model/storage.dto.delete";
import { StorageUpdateDto } from "./model/storage.dto.update";
import { Storage } from "./model/storage.entity";
import { getAllStorageTitlesQuery } from "./storage.queries";

@Injectable()
export class StorageService {
    @InjectRepository(Storage)
    private readonly repository: Repository<Storage>;

    public async getStorage(id: number) : Promise<Storage> | never {
        if(!id || typeof(id) !== 'number' || id <= 0) { throw new Error('Invalid ID!'); }

        const found: Storage = await this.repository.findOne({ where: { id: id } });
        if(found) { return found; }

        throw new Error('Storage not found!');
    }

    public async newStorage(body: StorageCreateDto, req: Request) : Promise<Storage> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        const storage: Storage = new Storage();
        storage.manufacturer = body.manufacturer;
        storage.model = body.model;
        storage.price = body.price;

        let capacity: number = body.capacity;
        if(capacity && typeof(capacity) === 'number') {
            storage.capacity = capacity;
        } else {
            storage.capacity = null;
        }

        return this.repository.save(storage);
    }

    public async editStorage(body: StorageUpdateDto, req: Request) : Promise<Storage> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let manufacturer: string = body.manufacturer?.trim();
        let model: string = body.model?.trim();
        let price: number = body.price;
        let capacity: number = body.capacity;

        if(!manufacturer && !model && !price && !capacity) {
            throw new Error('CPU information did not change!');
        }

        let savedStorage: Storage = await this.repository.findOne({ where: { id: body.id } });
        if(!savedStorage) { throw new Error('Storage not found!'); }

        let shouldUpdate: boolean[] = [ true, true, true, true ];

        // ----- MANUFACTURER -----
        if(manufacturer && manufacturer.length > 0) {
            if(manufacturer === savedStorage.manufacturer) {
                shouldUpdate[0] = false;
            } else {
                savedStorage.manufacturer = manufacturer;
            }
        } else {
            shouldUpdate[0] = false;
        }

        // ----- MODEL -----
        if(model && model.length > 0) {
            if(model === savedStorage.model) {
                shouldUpdate[1] = false;
            } else {
                savedStorage.model = model;
            }
        } else {
            shouldUpdate[1] = false;
        }

        // ----- PRICE -----
        if(typeof(price) === 'number' && price > 0) {
            if(savedStorage.price === price) {
                shouldUpdate[2] = false;
            } else {
                savedStorage.price = price;
            }
        } else {
            shouldUpdate[2] = false;
        }

        // ----- CAPACITY -----
        if(typeof(capacity) === 'number' && capacity > 0) {
            if(savedStorage.capacity === capacity) {
                shouldUpdate[3] = false;
            } else {
                savedStorage.capacity = capacity;
            }
        } else {
            shouldUpdate[3] = false;
        }

        for(let i = 0; i < 4; i++) {
            if(shouldUpdate[i] === true) {
                // desila se bar jedna promena, mozemo da azuriramo
                return this.repository.save(savedStorage);
            }
        }

        throw new Error('Storage information did not change!');
    }

    public async deleteStorage(body: StorageDeleteDto, req: Request) : Promise<boolean> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let result: DeleteResult = await this.repository.delete(body.id);
        return !!result.affected;
    }

    public async getAllStorages() : Promise<StorageIDName[]> | never {
        let results: StorageIDName[] = await this.repository.query(getAllStorageTitlesQuery);
        if(Array.isArray(results)) {
            return results;
        }

        throw new Error('Database query error!');
    }
}