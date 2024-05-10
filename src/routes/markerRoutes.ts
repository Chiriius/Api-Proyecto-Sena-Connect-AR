import express from 'express'
import { register,getAllMarkers } from '../controllers/markerController'
const router = express.Router()
const bodyParser = require("body-parser"); 

router.use(bodyParser.urlencoded({ extended: false })); 
router.use(bodyParser.json());

router.post ('/register', register)
router.get ('/all-markers', getAllMarkers)


export default router;