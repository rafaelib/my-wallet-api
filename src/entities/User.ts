import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import Transaction from "./Transaction";

@Entity("users")
export default class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transaction: Transaction;
}
