import { AllowNull, BelongsTo, Column, DataType, ForeignKey, Model, NotEmpty, Table } from "sequelize-typescript";
import Profiles from "./Profile.model";
import Memberships from "./Membership.model";

export interface SuscriptionI {
  id?: string;
  profile_id: string;
  membership_id: string;
  date_start: Date;
  date_end: Date;
  status?: string;
}

@Table({
  tableName: "suscriptions",
})
class Suscriptions extends Model implements SuscriptionI {
  @Column({
    primaryKey: true,
    defaultValue: DataType.UUIDV4,
    type: DataType.UUID,
  })
    id!: string;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => Profiles)
  @Column({type: DataType.UUID})
    profile_id!: string;

  @AllowNull(false)
  @NotEmpty
  @ForeignKey(() => Memberships)
  @Column({type: DataType.UUID})
    membership_id!: string;

  @AllowNull(false)
  @NotEmpty
  @Column({ type: DataType.TIME })
    date_start!: Date;

  @AllowNull(false)
  @NotEmpty
  @Column({ type: DataType.TIME })
    date_end!: Date;

  @Column({ type: DataType.STRING(25), defaultValue: "Active" })
    status!: string;


  @BelongsTo(() => Profiles)
    profile: Profiles;
  @BelongsTo(() => Memberships)
    membership: Memberships;
}


export default Suscriptions;