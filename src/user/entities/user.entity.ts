import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  uid: number

  @Column()
  name: string

  @Column()
  passwd: string

  @Column()
  isHave: boolean
}
