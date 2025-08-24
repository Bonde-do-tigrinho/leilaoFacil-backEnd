import {Router} from 'express'
import * as ImoveisController from '../controller/imoveis-controller'
import * as UserController from '../controller/user-controller'

const router = Router();

router.get('/imoveis', ImoveisController.ListImoveis)

router.post('/usuario', UserController.postUser)

export default router;