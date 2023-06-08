import { sequelize } from "../db";
import Rooms from "~/db/models/Room.model";
import Participants from "~/db/models/Participant.model";
import CustomError from "~/utils/custom-error";

export default class ParticipantsService {
  static async joinRoom(meet_id: string, user_id: string): Promise<void> {
    const transaction = await sequelize.transaction();
    try {
      const room = await Rooms.findOne({ where: { meet_id }, transaction });

      if (!room) {
        throw new CustomError("The room does not exist.", 404, "Not Found Error");
      }

      if (room.current_participants >= room.max_participants) {
        throw new CustomError("The room has reached the maximum number of participants.", 400, "BadRequestError");
      }

      if (room.status !== "active") {
        throw new CustomError("The room is not active.", 400, "Bad Request Error");
      }

      await Participants.create(
        {
          room_id: room.id,
          user_id,
        },
        { transaction },
      );

      await Rooms.update(
        { current_participants: room.current_participants + 1 },
        { where: { id: room.id }, transaction },
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async leaveRoom(meet_id: string, user_id: string): Promise<void> {
    const transaction = await sequelize.transaction();
    try {
      const room = await Rooms.findOne({ where: { meet_id }, transaction });

      if (!room) {
        throw new CustomError("The room does not exist.", 404, "Not Found Error");
      }

      const participant = await Participants.findOne({
        where: { room_id: room.id, user_id },
        transaction,
      });

      if (!participant) {
        throw new CustomError("The participant does not exist.", 404, "Not Found Error");
      }

      await Participants.update({ is_active: false }, { where: { room_id: room.id, user_id }, transaction });

      const activeParticipants = room.current_participants - 1;

      await Rooms.update({ current_participants: activeParticipants }, { where: { id: room.id }, transaction });

      if (activeParticipants === 0) {
        await Rooms.update({ status: "inactive" }, { where: { id: room.id }, transaction });
      }

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
}
