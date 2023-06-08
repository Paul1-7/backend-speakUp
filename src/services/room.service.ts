import Rooms, { RoomI } from "~/db/models/Room.model";
import { sequelize } from "../db";
import VideoSdkService from "./videosdk.service";
import Participants from "~/db/models/Participant.model";
import Users from "~/db/models/User.model";

export default class RoomsService {
  static async createRoom(room: RoomI): Promise<object> {
    const transaction = await sequelize.transaction();
    try {
      const roomId = await VideoSdkService.createRoom();

      const newRoom = await Rooms.create(
        {
          ...room,
          meet_id: roomId,
        },
        { transaction },
      );

      await transaction.commit();
      return newRoom.dataValues;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async getAllRooms(): Promise<object[]> {
    const rooms = await Rooms.findAll({
      where: {
        status: "active",
      },
      include: [
        {
          model: Participants,
          where: {
            is_active: true,
          },
          attributes: ["id", "user_id"],
          include: [
            {
              model: Users,
              attributes: ["id", "first_name", "last_name", "email"],
            },
          ],
        },
      ],
    });
    return rooms;
  }
}
