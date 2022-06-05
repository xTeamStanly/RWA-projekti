import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { UserRoles } from "src/enums";
import { RAMIDName } from "src/interfaces";
import { DeleteResult, Repository } from "typeorm";
import { User } from "../user/model/user.entity";
import { RAMCreateDto } from "./model/ram.dto.create";
import { RamDeleteDto } from "./model/ram.dto.delete";
import { RAMUpdateDto } from "./model/ram.dto.update";
import { RAM } from "./model/ram.entity";
import { getAllRAMTitlesQuery } from "./ram.queries";

@Injectable()
export class RAMService {
    @InjectRepository(RAM)
    private readonly repository: Repository<RAM>;

    public async getRAM(id: number) : Promise<RAM> | never {
        if(!id || typeof(id) !== 'number' || id <= 0) { throw new Error('Invalid ID!'); }

        const found: RAM = await this.repository.findOne({ where: { id: id } });
        if(found) { return found; }

        throw new Error('RAM not found!');
    }

    public async newRAM(body: RAMCreateDto, req: Request) : Promise<RAM> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        const ram: RAM = new RAM();
        ram.manufacturer = body.manufacturer;
        ram.model = body.model;
        ram.price = body.price;

        let frequency: number = body.frequency;
        if(frequency && typeof(frequency) === 'number') {
            frequency = ~~frequency;
            ram.frequency = frequency;
        } else {
            ram.frequency = null;
        }

        let capacity: number = body.capacity;
        if(capacity && typeof(capacity) === 'number') {
            capacity = ~~capacity;
            ram.capacity = capacity;
        } else {
            ram.capacity = null;
        }

        return this.repository.save(ram);
    }

    public async editRAM(body: RAMUpdateDto, req: Request) : Promise<RAM> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let manufacturer: string = body.manufacturer?.trim();
        let model: string = body.model?.trim();
        let price: number = body.price;
        let frequency: number = body.frequency;
        let capacity: number = body.capacity;

        if(!manufacturer && !model && !price && !frequency && !capacity) {
            throw new Error('RAM information did not change!');
        }

        let savedRAM: RAM = await this.repository.findOne({ where: { id: body.id } });
        if(!savedRAM) { throw new Error('RAM not found!'); }

        let shouldUpdate: boolean[] = [ true, true, true, true, true ];

        // ----- MANUFACTURER -----
        if(manufacturer && manufacturer.length > 0) {
            if(manufacturer === savedRAM.manufacturer) {
                shouldUpdate[0] = false;
            } else {
                savedRAM.manufacturer = manufacturer;
            }
        } else {
            shouldUpdate[0] = false;
        }

        // ----- MODEL -----
        if(model && model.length > 0) {
            if(model === savedRAM.model) {
                shouldUpdate[1] = false;
            } else {
                savedRAM.model = model;
            }
        } else {
            shouldUpdate[1] = false;
        }

        // ----- PRICE -----
        if(typeof(price) === 'number' && price > 0) {
            if(savedRAM.price === price) {
                shouldUpdate[2] = false;
            } else {
                savedRAM.price = price;
            }
        } else {
            shouldUpdate[2] = false;
        }

        // ----- CAPACITY -----
        if(typeof(capacity) === 'number' && capacity > 0) {
            capacity = ~~capacity;
            if(savedRAM.capacity === capacity) {
                shouldUpdate[3] = false;
            } else {
                savedRAM.capacity = capacity;
            }
        } else {
            shouldUpdate[3] = false;
        }

        // ----- FREQUENCY -----
        if(typeof(frequency) === 'number' && frequency > 0) {
            frequency = ~~frequency;
            if(savedRAM.frequency === frequency) {
                shouldUpdate[4] = false;
            } else {
                savedRAM.frequency = frequency;
            }
        } else {
            shouldUpdate[4] = false;
        }


        for(let i = 0; i < 5; i++) {
            if(shouldUpdate[i] === true) {
                // desila se bar jedna promena, mozemo da azuriramo
                return this.repository.save(savedRAM);
            }
        }

        throw new Error('RAM information did not change!');
    }

    public async deleteRAM(body: RamDeleteDto, req: Request) : Promise<boolean> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let result: DeleteResult = await this.repository.delete(body.id);
        return !!result.affected;
    }

    public async getAllRAMs() : Promise<RAMIDName[]> | never {
        let results: RAMIDName[] = await this.repository.query(getAllRAMTitlesQuery);
        if(Array.isArray(results)) {
            return results;
        }

        throw new Error('Database query error!');
    }
}