import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'cpu' })
export class CPU {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', nullable: false, length: 5 })
    public manufacturer!: string;

    @Column({ type: 'varchar', nullable: false, length: 20 })
    public model!: string;

    @Column({ type: 'numeric', nullable: false })
    public price!: number;

    @Column({ type: 'numeric', nullable: true })
    public frequency?: number;

    @Column({ type: 'numeric', nullable: true })
    public cores?: number;
};