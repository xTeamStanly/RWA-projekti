import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Request } from "express";
import { UserRoles } from "src/enums";
import { ConfigurationIDNamePrice } from "src/interfaces";
import { DeleteResult, Repository } from "typeorm";
import { CPU } from "../cpu/model/cpu.entity";
import { GPU } from "../gpu/model/gpu.entity";
import { Motherboard } from "../motherboard/model/motherboard.entity";
import { RAM } from "../ram/model/ram.entity";
import { Storage } from "../storage/model/storage.entity";
import { User } from "../user/model/user.entity";
import { getAllConfigurationPrices } from "./configuration.queries";
import { ConfigurationCreateDto } from "./model/configuration.dto.create";
import { ConfigurationDeleteDto } from "./model/configuration.dto.delete";
import { ConfigurationUpdateDto } from "./model/configuration.dto.update";
import { Configuration } from "./model/configuration.entity";

@Injectable()
export class ConfigurationService {
    @InjectRepository(Configuration)
    private readonly repository: Repository<Configuration>;

    @InjectRepository(CPU)
    private readonly cpuRepository: Repository<CPU>;

    @InjectRepository(GPU)
    private readonly gpuRepository: Repository<GPU>;

    @InjectRepository(RAM)
    private readonly ramRepository: Repository<RAM>;

    @InjectRepository(Motherboard)
    private readonly motherboardRepository: Repository<Motherboard>;

    @InjectRepository(Storage)
    private readonly storageRepository: Repository<Storage>;

    public async getConfiguration(id: number) : Promise<Configuration> | never {
        if(!id || typeof(id) !== 'number' || id <= 0) { throw new Error('Invalid ID!'); }

        const found: Configuration = await this.repository.findOne({
            where: { id: id },
            relations: ['cpu', 'gpu', 'motherboard', 'storage', 'ram']
        });
        if(found) { return found; }

        throw new Error('GPU not found!');
    }

    public async newConfiguration(body: ConfigurationCreateDto, req: Request) : Promise<Configuration> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        const cpu: CPU = await this.cpuRepository.findOne({ where: { id: body.cpuID } });
        if(!cpu) { throw new Error('CPU not found!'); }

        const gpu: GPU = await this.gpuRepository.findOne({ where: { id: body.gpuID } });
        if(!gpu) { throw new Error('GPU not found!'); }

        const ram: RAM = await this.ramRepository.findOne({ where: { id: body.ramID } });
        if(!ram) { throw new Error('RAM not found!'); }

        const motherboard: Motherboard = await this.motherboardRepository.findOne({ where: { id: body.motherboardID } });
        if(!motherboard) { throw new Error('Motherboard not found!'); }

        const storage: Storage = await this.storageRepository.findOne({ where: { id: body.storageID } });
        if(!storage) { throw new Error('Storage not found!'); }

        const configuration: Configuration = new Configuration();
        configuration.name = body.name;
        configuration.cpu = cpu;
        configuration.gpu = gpu;
        configuration.ram = ram;
        configuration.motherboard = motherboard;
        configuration.storage = storage;

        return this.repository.save(configuration);
    }

    public async editConfiguration(body: ConfigurationUpdateDto, req: Request) : Promise<Configuration> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let cpuID: number = body.cpuID;
        let gpuID: number = body.gpuID;
        let ramID: number = body.ramID;
        let motherboardID: number = body.motherboardID;
        let storageID: number = body.storageID;
        let name: string = body.name?.trim();

        if(!cpuID && !gpuID && !ramID && !motherboardID && !storageID && !name) {
            throw new Error('Configuration information did not change!');
        }

        let savedConfiguration: Configuration = await this.repository.findOne({
            where: { id: body.id },
            relations: [ 'cpu', 'gpu', 'ram', 'motherboard', 'storage' ]
        });
        console.log(savedConfiguration);
        if(!savedConfiguration) { throw new Error('Configuration not found!'); }

        let shouldUpdate: boolean[] = [ true, true, true, true, true, true ];

        // ----- CPU -----
        if(cpuID) {
            const foundCPU: CPU = await this.cpuRepository.findOne({ where: { id: cpuID } });
            // ako ne nadje procesor ignorise to polje

            if(foundCPU) {
                if(savedConfiguration.cpu.id === foundCPU.id) {
                    shouldUpdate[0] = false;
                } else {
                    savedConfiguration.cpu = foundCPU;
                }
            } else {
                // procesor ne postoji, ne azuriraj polje
                shouldUpdate[0] = false;
            }
        } else {
            shouldUpdate[0] = false;
        }

        // ----- GPU -----
        if(gpuID) {
            const foundGPU: GPU = await this.gpuRepository.findOne({ where: { id: gpuID } });
            if(foundGPU) {
                if(savedConfiguration.gpu.id === foundGPU.id) {
                    shouldUpdate[1] = false;
                } else {
                    savedConfiguration.gpu = foundGPU;
                }
            } else {
                shouldUpdate[1] = false;
            }
        } else {
            shouldUpdate[1] = false;
        }

        // ----- RAM -----
        if(ramID) {
            const foundRAM: RAM = await this.ramRepository.findOne({ where: { id: ramID } });
            if(foundRAM) {
                if(savedConfiguration.ram.id === foundRAM.id) {
                    shouldUpdate[2] = false;
                } else {
                    savedConfiguration.ram = foundRAM;
                }
            } else {
                shouldUpdate[2] = false;
            }
        } else {
            shouldUpdate[2] = false;
        }

        // ----- MOTHERBOARD -----
        if(motherboardID) {
            const foundMotherboard: Motherboard = await this.motherboardRepository.findOne({ where: { id: motherboardID } });
            if(foundMotherboard) {
                if(savedConfiguration.motherboard.id === foundMotherboard.id) {
                    shouldUpdate[3] = false;
                } else {
                    savedConfiguration.motherboard = foundMotherboard;
                }
            } else {
                shouldUpdate[3] = false;
            }
        } else {
            shouldUpdate[3] = false;
        }

        // ----- STORAGE -----
        if(storageID) {
            const foundStorage: Storage = await this.storageRepository.findOne({ where: { id: storageID } });
            if(foundStorage) {
                if(savedConfiguration.storage.id === foundStorage.id) {
                    shouldUpdate[4] = false;
                } else {
                    savedConfiguration.storage = foundStorage;
                }
            } else {
                shouldUpdate[4] = false;
            }
        } else {
            shouldUpdate[4] = false;
        }

        // ----- NAME -----
        if(name) {
            if(savedConfiguration.name.toLocaleLowerCase() === name.toLocaleLowerCase()) {
                shouldUpdate[5] = false;
            } else {
                savedConfiguration.name = name;
            }
        } else {
            shouldUpdate[5] = false;
        }

        for(let i = 0; i < 6; i++) {
            if(shouldUpdate[i] === true) {
                return this.repository.save(savedConfiguration);
            }
        }

        throw new Error('Configuration information did not change!');
    }

    public async deleteConfiguration(body: ConfigurationDeleteDto, req: Request) : Promise<boolean> | never {
        const user: User = req.user as User;
        if(user.role !== UserRoles.ADMINISTRATOR) { throw new Error('Unauthorized!'); }

        let result: DeleteResult = await this.repository.delete(body.id);
        return !!result.affected;
    }

    public async getAllConfigurations() : Promise<ConfigurationIDNamePrice[]> | never {
        let results: ConfigurationIDNamePrice[] = await this.repository.query(getAllConfigurationPrices);
        if(Array.isArray(results)) { return results; }

        throw new Error('Database query error!');
    }

    public async getConfigurationByName(name: string) : Promise<Configuration> | never {
        if(!name || typeof(name) !== 'string') { throw new Error('Invalid name!'); }
        name = name.trim();
        if(!name)  { throw new Error('Invalid name!'); }

        let found: Configuration = await this.repository
            .createQueryBuilder('config')
            .innerJoinAndMapOne('config.cpu', CPU, 'cpu', 'config.cpuId = cpu.id')
            .innerJoinAndMapOne('config.gpu', GPU, 'gpu', 'config.gpuId = gpu.id')
            .innerJoinAndMapOne('config.ram', RAM, 'ram', 'config.ramId = ram.id')
            .innerJoinAndMapOne('config.storage', Storage, 'storage', 'config.storageId = storage.id')
            .innerJoinAndMapOne('config.motherboard', Motherboard, 'motherboard', 'config.motherboardId = motherboard.id')
            .where('TRIM(LOWER(config.name)) = :configName', { configName: name.toLowerCase() })
            .getOne();

        if(found) { return found; }
        throw new Error('Configuration not found!');
    }
}