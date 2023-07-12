import { Column, Entity, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Plant {
  @PrimaryGeneratedColumn()
  id: number

  @Column()
  date: Date

  @Column()
  owner: string

  @Column()
  status: number

  @Column()
  type: string

  @Column()
  degree: number

  @Column()
  humidity: number

  @Column()
  earth: number

  @Column()
  leaf: number

  @Column()
  predict: number
}