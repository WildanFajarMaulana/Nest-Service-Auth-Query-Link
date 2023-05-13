import { Table, Model, Column, DataType } from 'sequelize-typescript';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@Table({ tableName: 'users', timestamps: true })
@ObjectType()
export class User extends Model {
  @Column({
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
  @Field()
  id: string;

  @Column
  @Field({ nullable: true })
  username: string;

  @Column
  @Field({ nullable: true})
  password: string;

  @Column
  @Field({ nullable: true})
  email: string;
}
