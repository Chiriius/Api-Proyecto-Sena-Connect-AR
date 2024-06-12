import express, { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { register,getAllMarkers, getMarkerById, updateMarker, deleteMarker } from '../controllers/markerController'
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

router.post ('/', register)
router.get ('/', getAllMarkers)
router.get('/:uid',getMarkerById)
router.put('/:uid',updateMarker)
router.delete('/:uid',authenticateToken,deleteMarker)


export default router;