import { BelongsTo, Column, DataType, ForeignKey, Model, Table } from "sequelize-typescript";
import Rooms from "./Room.model";
import Users from "./User.model";

export interface ParticipantI {
  id: string;
  room_id: string;
  user_id: string;
  is_active: boolean;
}

@Table({ tableName: "participants" })
class Participants extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
    id!: string;

  @Column({ type: DataType.BOOLEAN, defaultValue: true })
    is_active!: boolean;

  @ForeignKey(() => Rooms)
  @Column({ type: DataType.UUID })
    room_id!: string;

  @ForeignKey(() => Users)
  @Column({ type: DataType.UUID })
    user_id!: string;

  @BelongsTo(() => Rooms)
    room!: Rooms;

  @BelongsTo(() => Users)
    user!: Users;
}

export default Participants;
