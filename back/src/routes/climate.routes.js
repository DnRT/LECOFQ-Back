import { Router } from "express";
import { methods as climateMethods } from "../controllers/climate.controller";

const routeClimate=Router();

routeClimate.get('/',climateMethods.getSeremi);

export default routeClimate;