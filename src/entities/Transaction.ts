import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("transactions")
export default class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: Number;

  @Column()
  amount: Number;

  @Column()
  type: String;

  @ManyToOne(() => User, (user) => user.transaction)
  user: User;
}
