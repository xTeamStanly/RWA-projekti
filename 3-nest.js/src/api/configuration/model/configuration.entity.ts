import { CPU } from "src/api/cpu/model/cpu.entity";
import { GPU } from "src/api/gpu/model/gpu.entity";
import { Motherboard } from "src/api/motherboard/model/motherboard.entity";
import { RAM } from "src/api/ram/model/ram.entity";
import { Storage } from "src/api/storage/model/storage.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'configuration' })
export class Configuration {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', nullable: false, length: 50 })
    public name!: string;

    @ManyToOne(() => CPU)
    public cpu!: CPU;

    @ManyToOne(() => GPU)
    public gpu!: GPU;

    @ManyToOne(() => RAM)
    public ram!: RAM;

    @ManyToOne(() => Motherboard)
    public motherboard!: Motherboard;

    @ManyToOne(() => Storage)
    public storage!: Storage;
}