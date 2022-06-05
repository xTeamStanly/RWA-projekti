import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'user' })
export class User {
    @PrimaryGeneratedColumn()
    public id!: number;

    @Column({ type: 'varchar', nullable: false, length: 256 })
    public email!: string;

    @Column({ type: 'varchar', nullable: false, length: 64 })
    public password!: string;

    @Column({ type: 'varchar', nullable: true, length: 20 })
    public name?: string;

    @Column({ type: 'varchar', nullable: true, length: 20 })
    public surname?: string;

    @Column({ type: 'integer', nullable: false, default: 0 })
    public role: number;
}