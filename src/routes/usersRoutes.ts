import express from 'express'
import { updateUser } from '../controllers/usersController';

const router = express.Router()
const bodyParser = require("body-parser"); 

router.use(bodyParser.urlencoded({ extended: false })); 
router.use(bodyParser.json());

router.post ('/update', updateUser)
router.post ('/', )

export default router;