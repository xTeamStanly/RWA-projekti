import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'ram' })
export class RAM {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', nullable: false, length: 10 })
    public manufacturer!: string;

    @Column({ type: 'varchar', nullable: false, length: 25 })
    public model!: string;

    @Column({ type: 'numeric', nullable: false })
    public price!: number;

    @Column({ type: 'numeric', nullable: true })
    public frequency?: number;

    @Column({ type: 'numeric', nullable: true })
    public capacity?: number;
};