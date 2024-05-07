import express from 'express'
import { register,login } from '../controllers/authController'
const router = express.Router()
const bodyParser = require("body-parser"); 

router.use(bodyParser.urlencoded({ extended: false })); 
router.use(bodyParser.json());

router.post ('/register', register)
router.post ('/login', login)

export default router;