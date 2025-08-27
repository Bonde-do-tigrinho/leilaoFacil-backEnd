import {Router} from 'express'
import * as ImoveisController from '../controller/imoveis-controller'
import * as UserController from '../controller/user-controller'
import { authenticateLogin } from '../middlewares/authLogin';
import { adminVerification } from '../middlewares/adminVerification';

const router = Router();
//imoveis
router.get('/imoveis', authenticateLogin, ImoveisController.ListImoveis)
router.get('/imoveis/favoritos', authenticateLogin ,ImoveisController.ListFavorites)

//usuario
router.get('/usuario', authenticateLogin, UserController.getUser)
router.post('/usuario', authenticateLogin, adminVerification, UserController.postUser)
router.post('/usuario/login', UserController.postLogin)
router.patch('/usuario', UserController.patchUser)
router.patch('/usuario/favoritos', authenticateLogin, UserController.patchFavorite)
router.patch('/usuario/favoritos/remover', authenticateLogin, UserController.patchRemoveFavorite)

export default router;