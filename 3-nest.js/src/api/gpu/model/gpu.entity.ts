import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'gpu' })
export class GPU {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', nullable: false, length: 6 })
    public manufacturer!: string;

    @Column({ type: 'varchar', nullable: false, length: 25 })
    public model!: string;

    @Column({ type: 'numeric', nullable: false })
    public price!: number;

    @Column({ type: 'numeric', nullable: true })
    public vram?: number;
}