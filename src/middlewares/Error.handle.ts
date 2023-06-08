import { ErrorRequestHandler } from "express";

export const errorHandler: ErrorRequestHandler = (err: Error, req, res, next) => {
  console.log("error", err);
  return res.status(500).json({ message: "error en el servidor" });
};
