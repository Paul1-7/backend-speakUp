import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Languages from "./Language.model";

export interface TopicI {
    id?: number;
    language_id: number;
}

@Table({tableName: "topics"})
class Topics extends Model implements TopicI {
    @Column({primaryKey: true})
      id!: number;

    @ForeignKey(() => Languages)
    @Column({type: DataType.INTEGER})
      language_id!: number;



    @BelongsTo(() => Languages)
      language: Languages;
}

export default Topics;