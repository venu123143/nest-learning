import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class Item {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ default: true })
    public: boolean;
    
    constructor(item: Partial<Item>) {
        Object.assign(this, item)
    }
}
