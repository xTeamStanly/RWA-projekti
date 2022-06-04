import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'storage' })
export class Storage {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', nullable: false, length: 20 })
    public manufacturer!: string;

    @Column({ type: 'varchar', nullable: false, length: 15 })
    public model!: string;

    @Column({ type: 'numeric', nullable: false })
    public price!: number;

    @Column({ type: 'number', nullable: true })
    public capacity?: number;
};