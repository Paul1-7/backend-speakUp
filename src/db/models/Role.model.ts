import { Table, Column, Model, AutoIncrement, PrimaryKey } from "sequelize-typescript";

export interface RoleI {
    id?: number,
    description: string,
    status: number
}

@Table({
  tableName: "roles",
  timestamps: true,
})
class Roles extends Model implements RoleI {
    
  @AutoIncrement
  @PrimaryKey
  @Column
    id!: number;

  @Column
    description!: string;

  @Column({
    defaultValue: 1
  })
    status!: number;
}

export default Roles;