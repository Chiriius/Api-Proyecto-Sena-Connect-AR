import express, { NextFunction, Request, Response } from 'express'
import { registerActivity,getAllActivity } from '../controllers/activity_markerController'
const router = express.Router()
const bodyParser = require("body-parser"); 
router.use(bodyParser.urlencoded({ extended: false })); 
router.use(bodyParser.json());



router.post ('/register', registerActivity)
router.get ('/', getAllActivity)



export default router;