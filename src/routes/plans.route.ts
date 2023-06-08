import { Router } from "express";
import { getPlans, getPlansById } from "~/controllers/plans.controller";

const routeSuscriptions = Router();

routeSuscriptions.get("/", getPlans);
routeSuscriptions.get("/:id", getPlansById);

export default routeSuscriptions;
