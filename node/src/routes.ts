import { Router } from 'express'

const routes = Router()

import UsersController from './controllers/UsersController'
import SurveysController from './controllers/SurveysController'

routes.post('/users', UsersController.create)
routes.get('/surveys', SurveysController.index)
routes.post('/surveys', SurveysController.create)


export { routes }