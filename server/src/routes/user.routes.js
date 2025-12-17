import express from 'express'
import { register } from '../controllers/user.resgisterControllers.js'
import { login } from '../controllers/user.loginController.js'
import { userAuthorization } from '../middlewares/userAuthorization.js'
import { addMovies, editMovies, removeMovie } from '../controllers/adminController.js'
import { adminOnly } from '../middlewares/adminOnly.js'
import { getMoviesInPage, getSpecificMovies } from '../controllers/getMovie.controller.js'
const routes = express.Router()

routes.post('/register',register)
routes.post('/login',login)

routes.post('/admin',userAuthorization,adminOnly,addMovies)
routes.put('/admin/:id',userAuthorization,adminOnly,editMovies)
routes.delete('/admin/:id',userAuthorization,adminOnly,removeMovie)

routes.get('/movies/:id',userAuthorization,adminOnly,getSpecificMovies);
routes.get('/movies',userAuthorization,getMoviesInPage);
export default routes