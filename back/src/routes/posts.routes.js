import { Router } from "express";
import {methods as postsController} from "../controllers/posts.controller";

const routePosts=Router();

routePosts.get('/', postsController.getPosts);
routePosts.get('/:id',postsController.getPost);

export default routePosts;