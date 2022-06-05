import { Configuration } from "src/api/configuration/model/configuration.entity";
import { User } from "src/api/user/model/user.entity";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'purchase' })
export class Purchase {
    @PrimaryGeneratedColumn()
    public id!: number;

    @ManyToOne(() => Configuration)
    public configuration: Configuration;

    @ManyToOne(() => User)
    public user: User;

    @Column({ type: 'timestamptz', nullable: false })
    public date: Date;
}