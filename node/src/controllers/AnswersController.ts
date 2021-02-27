import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRespository } from "../repositories/SurveysUsersRespository";

class AnswersController {
  async execute(req: Request, res: Response) {
    const { value } = req.params;
    const { u } = req.query;

    const surveysUsersRepository = getCustomRepository(SurveysUsersRespository);

    const surveyUser = await surveysUsersRepository.findOne({
      id: String(u),
    });

    if (!surveyUser) {
      throw new AppError("Survey User does not exists!");
    }

    surveyUser.value = Number(value);

    await surveysUsersRepository.save(surveyUser);

    return res.json(surveyUser);
  }
}

export default new AnswersController();
