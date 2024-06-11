import { Request, Response } from "express";
import prisma from '../models/route/route';
import { randomUUID } from "crypto";

export const registerRoute = async (req:Request, res:Response)=>
    {

        const {
            name,
            image,
            mar_id

        } =req.body;

        const  mar_idFK = parseInt(mar_id);
        const uid = randomUUID();
        try {
            if (!name){
                res.status(400).json({message:"El nombre es obligatorio"})
                return
            }

          
            if (!mar_id){
                res.status(400).json({message:"La id  del marcador es obligatorio"})
                return
            }
            const  route = await prisma.create ({
                data : {
                    uid,
                    rout_name : name,
                    rout_image : image,
                    mar_idFK : mar_idFK
                }
            });
            res.status(201).json({ message:"Ruta registrada exitosamente" })

        }
        catch(error : any) {
            console.log (error);
            res.status(500).json({ error: 'Ocurrió un error en el registro' });

        }

    }

export const getAllRoutes = async(req:Request, res:Response)=>{
    try {
        const routes = await prisma.findMany()
        res.status(200).json(routes);
    }
    catch (error: any){
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }

}

export const getRouteById = async (req: Request, res: Response): Promise<void> => {
    const route_uid = req.params.uid
    try {
        const route = await prisma.findUnique({
            where: {
                uid: route_uid
            }
        })
        if (!route) {
            res.status(404).json({ error: 'La ruta no fue encontrado' })
            return
        }
        res.status(200).json(route)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
}

export const updateRoute = async (req: Request, res: Response): Promise<void> => {
    const routeUid = req.params.uid
    const { name, image,mar_id } = req.body
    try {

        let dataToUpdate: any = { ...req.body }

       const mar_idFK = parseInt(mar_id);

        if (name) {
            dataToUpdate.rout_name = name
        }
        if (mar_id) {
            dataToUpdate.mar_idFK = mar_idFK
        }
        if (image) {
            dataToUpdate.rout_image = image
        }

        const route = await prisma.update({
            where: {
                uid: routeUid
            },
            data: dataToUpdate
        })

        res.status(200).json(route)
    } catch (error: any) {
        
         if (error?.code == 'P2025') {
            res.status(404).json('Ruta no encontrada')
        } else {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
        }
    }
}

export const deleteRoute = async (req: Request, res: Response): Promise<void> => {
    const routeUid = req.params.uid
    try {
        await prisma.delete({
            where: {
                uid: routeUid
            }
        })

        res.status(200).json({
            message: `La ruta con uid: ${routeUid} ha sido eliminada`
        }).end()

    } catch (error: any) {
        if (error?.code == 'P2025') {
            res.status(404).json('Ruta no encontrada')
        } else {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
        }
    }
}