import { Request, Response } from "express";
import prisma from '../models/marker/marker';
import { randomUUID } from "crypto";

export const register = async (req:Request, res:Response)=>
    {

        const {
            name,
            description

        } =req.body;

        const uid = randomUUID();
        try {
            if (!name){
                res.status(400).json({message:"El nombre es obligatorio"})
                return
            }

            if (!description){
                res.status(400).json({message:"La descripcion del marcador es obligatorio"})
                return
            }
            const  marker = await prisma.create ({
                data : {
                    mar_name : name,
                    uid,
                    mar_description : description
                }
            });
            res.status(201).json({ message:"Marcador registrado exitosamente" })

        }
        catch(error : any) {
            console.log (error);
            res.status(500).json({ error: 'Ocurrió un error en el registro' });

        }

    }

export const getAllMarkers = async(req:Request, res:Response)=>{
    try {
        const markers = await prisma.findMany()
        res.status(200).json(markers);
    }
    catch (error: any){
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }

}