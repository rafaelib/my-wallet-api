import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import User from "./User";

@Entity("transactions")
export default class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  userId: Number;

  @ManyToOne(() => User, (user) => user.transaction)
  user: User;
}
