import { Router } from "express";
import { createRoom, getAllRooms, joinRoom, leaveRoom } from "~/controllers/rooms.controller";
import validateToken from "~/middlewares/auth.middleware";

const routeUser = Router();

routeUser.get("/", getAllRooms);
routeUser.post("/", validateToken, createRoom);
routeUser.post("/join-room", validateToken, joinRoom);
routeUser.delete("/leave-room", validateToken, leaveRoom);

export default routeUser;
