import {Router} from 'express'
import * as ImoveisController from '../controller/imoveis-controller'
import * as UserController from '../controller/user-controller'
import { authenticateLogin } from '../middlewares/authLogin';
import { adminVerification } from '../middlewares/adminVerification';

const router = Router();

router.get('/imoveis', ImoveisController.ListImoveis)

router.post('/usuario', authenticateLogin, adminVerification, UserController.postUser)
router.post('/usuario/login', UserController.postLogin)
router.patch('/usuario', UserController.patchUser)

router.get('/teste', authenticateLogin, adminVerification, (req, res) =>{
    res.json({message: "rota protegida"})
})

export default router;