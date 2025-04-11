import { Router } from "express";
import { controller } from "../../../controllers";

const urlRouter = Router();

urlRouter.post('/shorten', controller.shortenUrl);
urlRouter.get('/:slug', controller.redirectUrl)
urlRouter.get('/links', controller.getAllLinks);

export { urlRouter };