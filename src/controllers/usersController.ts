import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.service";

import prisma from '../models/user/user';
import { error } from "console";


export const updateUser = async (req:Request, res:Response) =>{
    console.log('Update user');
     
    const {
        email,
        password,
        nombre,
        apellido,
        departamento,
        ciudad,
        barrio,
        direccion,
        genero,
        rol,
        uid,
        fechanacimiento,
    } = req.body;
    const id = parseInt(req.body.id, 10);
    try {
        let dataToUpdate: any ={...req.body}

        
        
        if(password) {
            const hashedPassword = await hashPassword(password); 
            dataToUpdate.password = hashedPassword
        }
        
        if (email) {
            dataToUpdate.email = email
        }
        if (nombre) {
            dataToUpdate.nombre = nombre
        }
        if (apellido) {
            dataToUpdate.apellido = apellido
        }
        if (departamento) {
            dataToUpdate.departamento = departamento
        }
        if (ciudad) {
            dataToUpdate.ciudad = ciudad
        }
        if (barrio) {
            dataToUpdate.barrio = barrio
        }
        if (direccion) {
            dataToUpdate.direccion = direccion
        }
        if (genero) {
            dataToUpdate.genero = genero
        }
        if (rol) {
            
    const rolInt = parseInt(rol, 10);
    
    if (!isNaN(rolInt)) {
       
        dataToUpdate.rol = rolInt;
    } else {
        
        res.status(400).json({ message: "El valor proporcionado para 'rol' no es un número válido" });
        return; 
    }
        }
        
       
          if (fechanacimiento) {
            dataToUpdate.fechaNacimiento = fechanacimiento
        }

        const user = await prisma.update({
            where: {
                uid: uid
            },
            data: dataToUpdate
        })
        if (!user) {

           res.status(404).json({ message: "No se encontro al usuario" });
           return

        }
        res.status(200).json({
            user,
            message: "Usuario actualizado exitosamente",
            nombreUsuario: nombre,
            ApellidoUsuario: apellido,
            correoUsuario: email,
            rolUsuario: rol,
            departamentoUsuario: departamento,
            ciudadUsuario: ciudad,
            barrioUsuario: barrio,
            direccionUsuario: direccion,
            fechaNacimientoUsuario: fechanacimiento,
            generoUsuario: genero,
            

        }
           
        );

    }
    catch (error: any) {
         if(error?.code ==='p2002' && error?.meta.target.includes('correo')){
            res.status(400).json({message:"El correo electrónico ya está registrado", error: 'El correo electrónico ya está registrado'})
        }
        else if(error?.code == 'P2025'){
            res.status(400).json({message:"Usuario no encontrado", error: 'Usuario no encontrado'})
        }
        else {
            console.log(error)
          res.status(500).json({ message: "Hubo un error prueba mas tarde" });
        }
       
        
    }
  


}

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.findMany()
        res.status(200).json(users);
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
}

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    const userUid = req.params.uid
    try {
        const user = await prisma.findUnique({
            where: {
                uid: userUid
            }
        })
        if (!user) {
            res.status(404).json({ error: 'El usuario no fue encontrado' })
            return
        }
        res.status(200).json(user)
    } catch (error: any) {
        console.log(error)
        res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
    }
}

export const deleteUser = async (req: Request, res: Response): Promise<void> => {
    const userUid = req.params.uid
    try {
        await prisma.delete({
            where: {
                uid: userUid
            }
        })

        res.status(200).json({
            message: `El usuario ${userUid} ha sido eliminado`
        }).end()

    } catch (error: any) {
        if (error?.code == 'P2025') {
            res.status(404).json('Usuario no encontrado')
        } else {
            console.log(error)
            res.status(500).json({ error: 'Hubo un error, pruebe más tarde' })
        }
    }

}