import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CPUIDName } from "src/interfaces";
import { DeleteResult, Repository } from "typeorm";
import { getAllCPUTitlesQuery } from "./cpu.queries";
import { CPUCreateDto } from "./model/cpu.dto.create";
import { CPUDeleteDto } from "./model/cpu.dto.delete";
import { CPUUpdateDto } from "./model/cpu.dto.update";
import { CPU } from "./model/cpu.entity";

@Injectable()
export class CPUService {
    @InjectRepository(CPU)
    private readonly repository: Repository<CPU>;

    public async getCPU(id: number) : Promise<CPU> | never {
        if(!id || typeof(id) !== 'number' || id <= 0) { throw new Error('Invalid ID!'); }

        const found: CPU = await this.repository.findOne({ where: { id: id } });
        if(found) { return found; }

        throw new Error('CPU not found!');
    }

    public async newCPU(body: CPUCreateDto) : Promise<CPU> | never {
        const cpu: CPU = new CPU();
        cpu.manufacturer = body.manufacturer;
        cpu.model = body.model;
        cpu.price = body.price;

        let frequency: number = body.frequency;
        if(frequency && typeof(frequency) === 'number') {
            cpu.frequency = frequency;
        } else {
            cpu.frequency = null;
        }

        let cores: number = body.cores;
        if(cores && typeof(cores) === 'number') {
            cores = ~~cores;
            cpu.cores = cores;
        } else {
            cpu.cores = null;
        }

        return this.repository.save(cpu);
    }

    public async editCPU(body: CPUUpdateDto) : Promise<CPU> | never {
        let manufacturer: string = body.manufacturer?.trim();
        let model: string = body.model?.trim();
        let price: number = body.price;
        let cores: number = body.cores;
        let frequency: number = body.frequency;

        if(!manufacturer && !model && !price && !cores && !frequency) {
            throw new Error('CPU information did not change!');
        }

        let savedCPU: CPU = await this.repository.findOne({ where: { id: body.id } });
        if(!savedCPU) { throw new Error('CPU not found!'); }

        let shouldUpdate: boolean[] = [ true, true, true, true, true ];

        // ----- MANUFACTURER -----
        if(manufacturer && manufacturer.length > 0) {
            if(manufacturer === savedCPU.manufacturer) {
                shouldUpdate[0] = false;
            } else {
                savedCPU.manufacturer = manufacturer;
            }
        } else {
            shouldUpdate[0] = false;
        }

        // ----- MODEL -----
        if(model && model.length > 0) {
            if(model === savedCPU.model) {
                shouldUpdate[1] = false;
            } else {
                savedCPU.model = model;
            }
        } else {
            shouldUpdate[1] = false;
        }

        // ----- PRICE -----
        if(typeof(price) === 'number' && price > 0) {
            if(savedCPU.price === price) {
                shouldUpdate[2] = false;
            } else {
                savedCPU.price = price;
            }
        } else {
            shouldUpdate[2] = false;
        }

        // ----- CORES -----
        if(typeof(cores) === 'number' && cores > 0) {
            cores = ~~cores;
            if(savedCPU.cores === cores) {
                shouldUpdate[3] = false;
            } else {
                savedCPU.cores = cores;
            }
        } else {
            shouldUpdate[3] = false;
        }

        // ----- FREQUENCY -----
        if(typeof(frequency) === 'number' && frequency > 0) {
            if(savedCPU.frequency === frequency) {
                shouldUpdate[4] = false;
            } else {
                savedCPU.frequency = frequency;
            }
        } else {
            shouldUpdate[4] = false;
        }


        for(let i = 0; i < 5; i++) {
            if(shouldUpdate[i] === true) {
                // desila se bar jedna promena, mozemo da azuriramo
                return this.repository.save(savedCPU);
            }
        }

        throw new Error('CPU information did not change!');
    }

    public async deleteCPU(body: CPUDeleteDto) : Promise<boolean> | never {
        let result: DeleteResult = await this.repository.delete(body.id);
        return !!result.affected; // number -> boolean trick
    }

    public async getAllCPUs() : Promise<CPUIDName[]> | never {
        let results: CPUIDName[] = await this.repository.query(getAllCPUTitlesQuery);
        if(Array.isArray(results)) {
            return results;
        }

        throw new Error('Database query error!');
    }
}