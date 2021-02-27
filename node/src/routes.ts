import { Router } from "express";

const routes = Router();

import UsersController from "./controllers/UsersController";
import SurveysController from "./controllers/SurveysController";
import SendMailController from "./controllers/SendMailController";
import AnswersController from "./controllers/AnswersController";
import NpsController from "./controllers/NpsController";

routes.post("/users", UsersController.create);

routes.get("/surveys", SurveysController.index);
routes.post("/surveys", SurveysController.create);

routes.post("/sendMail", SendMailController.execute);

routes.get("/answers/:value", AnswersController.execute);

routes.get("/nps/:survey_id", NpsController.execute);

export { routes };
