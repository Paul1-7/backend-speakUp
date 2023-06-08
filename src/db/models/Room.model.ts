/* eslint-disable indent */
import { AllowNull, Column, DataType, HasMany, Model, Table } from "sequelize-typescript";
import Participants from "./Participant.model";

export interface RoomI {
  id: string;
  title: string;
  level: string;
  language: string;
  topic: string;
  is_public: boolean;
  max_participants: number;
  current_participants: number;
  meet_id: string;
  status: string;
}

@Table({ tableName: "rooms" })
class Rooms extends Model {
  @Column({ primaryKey: true, defaultValue: DataType.UUIDV4, type: DataType.UUID })
  id!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  title!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  level!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  language!: string;

  @AllowNull(false)
  @Column({ type: DataType.BOOLEAN })
  is_public!: boolean;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER })
  max_participants!: number;

  @AllowNull(false)
  @Column({ type: DataType.INTEGER, defaultValue: 0 })
  current_participants!: number;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  meet_id!: string;

  @AllowNull(false)
  @Column({ type: DataType.STRING })
  topic!: string;

  @Column({ type: DataType.STRING, defaultValue: "active" })
  status!: string;

  @HasMany(() => Participants)
  participants!: Participants[];
}

export default Rooms;
