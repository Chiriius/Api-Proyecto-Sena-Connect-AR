import { Request, Response } from "express";
import prisma from '../models/marker/marker';
import { randomUUID } from "crypto";

export const register = async (req:Request, res:Response)=>
    {

        const {
            mar_name,
            mar_description

        } =req.body;
        
        const uid = randomUUID();
        try {
            if (!mar_name){
                res.status(400).json({message:"El nombre es obligatorio"})
                return
            }

            if (!mar_description){
                res.status(400).json({message:"La descripcion es obligatorio"})
                return
            }
            const  marker = await prisma.create ({
                data : {
                    mar_name,
                    uid,
                    mar_description
                }
            });
            res.status(201).json({ message:"Usuario registrado exitosamente" })

        }
        catch(error : any) {
            console.log (error);
            res.status(500).json({ error: 'Ocurrió un error en el registro' });

        }

    }
