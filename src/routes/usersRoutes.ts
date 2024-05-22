import express , { NextFunction, Request, Response }from 'express'
import { updateUser,getAllUsers,getUserById,deleteUser } from '../controllers/usersController';
import jwt from 'jsonwebtoken'

const router = express.Router()
const JWT_SECRET = process.env.JWT_SECRET || 'default-secret'
const bodyParser = require("body-parser"); 

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

router.post ('/update', updateUser)
router.get ('/all-users', getAllUsers)
router.get ('/:uid', getUserById )
router.delete ('/:uid',authenticateToken,deleteUser)

export default router;