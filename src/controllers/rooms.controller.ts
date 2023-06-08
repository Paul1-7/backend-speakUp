import { NextFunction, Request, Response } from "express";
import { sequelize } from "~/db/models";
import { RoomI } from "~/db/models/Room.model";
import ParticipantsService from "~/services/participant.service";
import RoomsService from "~/services/room.service";

const msg = {
  createSuccess: "The room was created successfully",
};

export async function createRoom(request: Request, response: Response, next: NextFunction) {
  const body: RoomI = request.body;
  try {
    const newRoom = (await RoomsService.createRoom(body)) as RoomI;
    return response.status(201).json({ meet_id: newRoom.meet_id, message: msg.createSuccess });
  } catch (error) {
    next(error);
  } finally {
    await sequelize.close();
  }
}

export async function joinRoom(request: Request, response: Response, next: NextFunction) {
  const { meet_id, user_id } = request.body;
  try {
    await ParticipantsService.joinRoom(meet_id, user_id);
    return response.status(201).json({ message: "Participant joined successfully" });
  } catch (error) {
    next(error);
  } finally {
    await sequelize.close();
  }
}

export async function leaveRoom(request: Request, response: Response, next: NextFunction) {
  const { meet_id, user_id } = request.body;
  try {
    await ParticipantsService.leaveRoom(meet_id, user_id);
    return response.sendStatus(204);
  } catch (error) {
    next(error);
  } finally {
    await sequelize.close();
  }
}

export async function getAllRooms(request: Request, response: Response, next: NextFunction) {
  try {
    const rooms = await RoomsService.getAllRooms();
    return response.status(200).json({ data: rooms });
  } catch (error) {
    next(error);
  } finally {
    await sequelize.close();
  }
}
