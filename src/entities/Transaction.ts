import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("transactions")
export default class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  amount: number;

  @Column()
  type: string;

  @Column()
  description: string;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.transaction)
  user: User;
}
