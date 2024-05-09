import express from 'express'
import { register } from '../controllers/markerController'
const router = express.Router()
const bodyParser = require("body-parser"); 

router.use(bodyParser.urlencoded({ extended: false })); 
router.use(bodyParser.json());

router.post ('/register', register)


export default router;