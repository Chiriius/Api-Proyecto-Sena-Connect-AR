import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { registerRoute, updateRoute, getRouteById, deleteRoute, getAllRoutes} from '../controllers/routController'
const router = express.Router()
const bodyParser = require("body-parser"); 
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'
router.use(bodyParser.urlencoded({ extended: false })); 
router.use(bodyParser.json());

const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) {
        return res.status(401).json({ error: 'No autorizado' })
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {

        if (err) {
            console.error('Error en la autenticación: ', err)
            return res.status(403).json({ error: 'No tienes acceso a este recurso' })
        }

        next();

    })

}

router.post ('/', registerRoute)
router.get ('/', getAllRoutes)
router.get('/:id',getRouteById)
router.put('/:id',updateRoute)
router.delete('/:id',authenticateToken,deleteRoute)


export default router;