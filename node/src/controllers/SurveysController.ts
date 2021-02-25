import { Request, Response } from 'express'
import { getCustomRepository } from 'typeorm'
import { SurveysRepository } from '../repositories/SurveysRepository'

class SurveysController {
    async index(req: Request, res: Response) {
        const surveysRepository = getCustomRepository(SurveysRepository)

        const surveys = await surveysRepository.find()

        return res.status(200).json(surveys)
     }
    
    async create(req: Request, res: Response) {
        const { title, description } = req.body

        const surveysRepository = getCustomRepository(SurveysRepository)

        const survey = surveysRepository.create({
            title,
            description
        })

        await surveysRepository.save(survey)

        return res.status(201).json(survey)
    }
}

export default new SurveysController