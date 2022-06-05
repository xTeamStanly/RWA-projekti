import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { UserRoles } from "src/enums";
import { GPUIDName } from "src/interfaces";
import { DeleteResult, Repository } from "typeorm";
import { User } from "../user/model/user.entity";
import { getAllGPUTitlesQuery } from "./gpu.queries";
import { GPUCreateDto } from "./model/gpu.dto.create";
import { GPUDeleteDto } from "./model/gpu.dto.delete";
import { GPUUpdateDto } from "./model/gpu.dto.update";
import { GPU } from "./model/gpu.entity";

@Injectable()
export class GPUService {
    @InjectRepository(GPU)
    private readonly repository: Repository<GPU>;

    public async getGPU(id: number) : Promise<GPU> | never {
        if(!id || typeof(id) !== 'number' || id <= 0) { throw new Error('Invalid ID!'); }

        const found: GPU = await this.repository.findOne({ where: { id: id } });
        if(found) { return found; }

        throw new Error('GPU not found!');
    }

    public async newGPU(body: GPUCreateDto, req: Request) : Promise<GPU> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        const gpu: GPU = new GPU();
        gpu.manufacturer = body.manufacturer;
        gpu.model = body.model;
        gpu.price = body.price;

        let vram: number = body.vram;
        if(vram && typeof(vram) === 'number') {
            vram = ~~vram;
            gpu.vram = vram;
        } else {
            gpu.vram = null;
        }

        return this.repository.save(gpu);
    }

    public async editGPU(body: GPUUpdateDto, req: Request) : Promise<GPU> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let manufacturer: string = body.manufacturer?.trim();
        let model: string = body.model?.trim();
        let price: number = body.price;
        let vram: number = body.vram;

        if(!manufacturer && !model && !price && !vram) {
            throw new Error('GPU information did not change!');
        }

        let savedGPU: GPU = await this.repository.findOne({ where: { id: body.id } });
        if(!savedGPU) { throw new Error('GPU not found!'); }

        let shouldUpdate: boolean[] = [ true, true, true, true ];

        // ----- MANUFACTURER -----
        if(manufacturer && manufacturer.length > 0) {
            if(manufacturer === savedGPU.manufacturer) {
                shouldUpdate[0] = false;
            } else {
                savedGPU.manufacturer = manufacturer;
            }
        } else {
            shouldUpdate[0] = false;
        }

        // ----- MODEL -----
        if(model && model.length > 0) {
            if(model === savedGPU.model) {
                shouldUpdate[1] = false;
            } else {
                savedGPU.model = model;
            }
        } else {
            shouldUpdate[1] = false;
        }

        // ----- PRICE -----
        if(typeof(price) === 'number' && price > 0) {
            if(savedGPU.price === price) {
                shouldUpdate[2] = false;
            } else {
                savedGPU.price = price;
            }
        } else {
            shouldUpdate[2] = false;
        }

        // ----- VRAM -----
        if(typeof(vram) === 'number' && vram > 0) {
            vram = ~~vram;
            if(savedGPU.vram === vram) {
                shouldUpdate[3] = false;
            } else {
                savedGPU.vram = vram;
            }
        } else {
            shouldUpdate[3] = false;
        }

        for(let i = 0; i < 4; i++) {
            if(shouldUpdate[i] === true) {
                // desila se bar jedna promena, mozemo da azuriramo
                return this.repository.save(savedGPU);
            }
        }

        throw new Error('GPU information did not change!');
    }

    public async deleteGPU(body: GPUDeleteDto, req: Request) : Promise<boolean> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let result: DeleteResult = await this.repository.delete(body.id);
        return !!result.affected;
    }

    public async getAllGPUs() : Promise<GPUIDName[]> | never {
        let results: GPUIDName[] = await this.repository.query(getAllGPUTitlesQuery);
        if(Array.isArray(results)) { return results; }

        throw new Error('Database query error!');
    }
}