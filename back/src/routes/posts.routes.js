import { Router } from "express";
import {methods as postsController} from "../controllers/posts.controller";

const route=Router();

route.get('/', postsController.getPosts);

export default route;