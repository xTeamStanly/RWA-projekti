import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'motherboard' })
export class Motherboard {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', nullable: false, length: 15 })
    public manufacturer!: string;

    @Column({ type: 'varchar', nullable: false, length: 20 })
    public model!: string;

    @Column({ type: 'numeric', nullable: false })
    public price!: number;
};