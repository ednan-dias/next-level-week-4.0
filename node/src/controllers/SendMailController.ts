import { Request, Response } from "express";
import path from "path";
import { getCustomRepository } from "typeorm";
import { AppError } from "../errors/AppError";
import { SurveysRepository } from "../repositories/SurveysRepository";
import { SurveysUsersRespository } from "../repositories/SurveysUsersRespository";
import { UsersRepository } from "../repositories/UsersRepository";
import SendMailService from "../services/SendMailService";

class SendMailController {
  async execute(req: Request, res: Response) {
    const { email, survey_id } = req.body;

    const usersRepository = getCustomRepository(UsersRepository);
    const surveysRepository = getCustomRepository(SurveysRepository);
    const surveysUsersRepository = getCustomRepository(SurveysUsersRespository);

    const user = await usersRepository.findOne({ email });

    if (!user) {
      throw new AppError("User does not exists");
    }

    const survey = await surveysRepository.findOne({
      id: survey_id,
    });

    if (!survey) {
      throw new AppError("Surveys does not exists");
    }

    const surveysUserAlreadyExists = await surveysUsersRepository.findOne({
      where: { user_id: user.id, value: null },
      relations: ["user", "survey"],
    });

    console.log("AQUI", surveysUserAlreadyExists);

    const variables = {
      name: user.name,
      title: survey.title,
      description: survey.description,
      id: "",
      link: process.env.URL_MAIL,
    };

    const npsPath = path.resolve(
      __dirname,
      "..",
      "views",
      "emails",
      "npsMail.hbs"
    );

    if (surveysUserAlreadyExists) {
      variables.id = surveysUserAlreadyExists.id;
      await SendMailService.execute(email, survey.title, variables, npsPath);
      return res.json(surveysUserAlreadyExists);
    }
    const surveyUser = surveysUsersRepository.create({
      user_id: user.id,
      survey_id,
    });

    await surveysUsersRepository.save(surveyUser);
    variables.id = surveyUser.id;

    await SendMailService.execute(email, survey.title, variables, npsPath);

    return res.json(surveyUser);
  }
}

export default new SendMailController();
