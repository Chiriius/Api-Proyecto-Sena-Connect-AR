import { Request, Response } from "express";
import prisma from '../models/activity_marker/activity_marker';
import prismaMarker from '../models/marker/marker';

export const registerActivity = async (req: Request, res: Response) => {
    const {
        mar_id,
    } = req.body;

    const fecharegistro: Date = new Date();

    try {
        if (!mar_id) {
            res.status(400).json({ message: "El id del marcador es obligatorio" });
            return;
        }

        const marker = await prismaMarker.findUnique({
            where: {
                mar_id: parseInt(mar_id),
            },
        });

        if (!marker) {
            res.status(404).json({ message: "Marcador no encontrado" });
            return;
        }

        const lastActivity = await prisma.findFirst({
            where: {
                mar_idfk: marker.mar_id,
            },
            orderBy: {
                act_id: 'desc',
            },
        });

        let count = 1;
        if (lastActivity) {
            count = lastActivity.count + 1;
        }

        const activity = await prisma.create({
            data: {
                mar_idfk: marker.mar_id,
                scan_date: fecharegistro,
                count,
            },
        });

        res.status(201).json({ message: "Actividad registrada exitosamente", count: activity.count });
    } catch (error: any) {
        console.log(error);
        res.status(500).json({ error: 'Ocurrió un error en el registro' });
    }
};

export const getAllActivity = async(req:Request, res:Response)=>{
    try {
        const activity = await prisma.findMany()
        res.status(200).json(activity);
    }
    catch (error: any){
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }

}