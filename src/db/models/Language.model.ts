/* eslint-disable indent */
import { Column, DataType, Model, Table, AutoIncrement, PrimaryKey } from "sequelize-typescript";

export interface LanguageI {
  id?: number;
  language: string;
  status?: string;
}

@Table({ tableName: "languages" })
class Languages extends Model implements LanguageI {
  @AutoIncrement
  @PrimaryKey
  @Column
  id!: number;

  @Column
  language!: string;

  @Column({ type: DataType.STRING(25), defaultValue: "Active" })
  status?: string;
}

export default Languages;
