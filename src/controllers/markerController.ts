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

export const getMarkerById = async (req: Request, res: Response): Promise<void> => {
    const markerUid = req.params.uid
    try {
        const marker = await prisma.findUnique({
            where: {
                uid: markerUid
            }
        })
        if (!marker) {
            res.status(404).json({ error: 'El marcador no fue encontrado' })
            return
        }
        res.status(200).json(marker)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
}

export const updateMarker = async (req: Request, res: Response): Promise<void> => {
    const markerUid = req.params.uid
    const { mar_name, mar_description } = req.body
    try {

        let dataToUpdate: any = { ...req.body }

       

        if (mar_name) {
            dataToUpdate.mar_name = mar_name
        }
        if (mar_description) {
            dataToUpdate.mar_description = mar_description
        }

        const marker = await prisma.update({
            where: {
                uid: markerUid
            },
            data: dataToUpdate
        })

        res.status(200).json(marker)
    } catch (error: any) {
        
         if (error?.code == 'P2025') {
            res.status(404).json('Marcador no encontrado')
        } else {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
        }
    }
}

export const deleteMarker = async (req: Request, res: Response): Promise<void> => {
    const markerUid = req.params.uid
    try {
        await prisma.delete({
            where: {
                uid: markerUid
            }
        })

        res.status(200).json({
            message: `El marcador con uid: ${markerUid} ha sido eliminado`
        }).end()

    } catch (error: any) {
        if (error?.code == 'P2025') {
            res.status(404).json('Marcador no encontrado')
        } else {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
        }
    }
}