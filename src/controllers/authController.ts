import { Request, Response } from "express";
import { comparePasswords, hashPassword } from "../services/password.service";
import prisma from '../models/user/user';
import { randomUUID } from "crypto";
import { generateToken } from "../services/auth.service";

export const register = async (req: Request, res: Response) => {
    console.log('Inicio registro');

    const {
        correo,
        contrasena,
        nombre,
        apellido,
        departamento,
        ciudad,
        barrio,
        direccion,
        genero,
        rol
    } = req.body;

    let rolN = 0;

 

    const uid = randomUUID();

    if (rol == "Visitante") {
        rolN = 2;
    } else if (rol == "Aprendiz") {
        rolN = 3;
    } else {
        rolN = 4;
    }

    const fecharegistro: Date = new Date();

    try {
        if (!contrasena) {
            res.status(400).json({message:"La contraseña es obligatoria"})
            return
        }

        if (!correo) {
            res.status(400).json({message:"El email es obligatorio"})
            return
        }
        const hashedPassword = await hashPassword(contrasena);

        const user = await prisma.create({
            data: {
                uid,
                email: correo,
                password: hashedPassword,
                nombre,
                apellido,
                departamento,
                ciudad,
                barrio,
                direccion,
                genero,
                rol: rolN,
                fecharegistro
            }
        });

        const token = generateToken(user);

        res.status(201).json({ message:"Usuario registrado exitosamente",token });
    } catch (error:any) {

        console.log(error);
       

        if(error?.code ==='p2002' && error?.meta.target.includes('correo')){
            res.status(400).json({message:"El correo electrónico ya está registrado"})
        }
        
        
        res.status(500).json({ error: 'Ocurrió un error en el registro' });
    }
}

export const login = async (req: Request, res:Response) => {
    const {correo,contrasena} =req.body
    try {
        console.log('Inicio Login');
        const user = await prisma.findUnique({where :{email : correo}})

        if(!user) {
            res.status(403).json({ message: "Credenciales incorrectas" });
            return
        }
        const passwordMatch = await comparePasswords(contrasena, user.password);
        console.log("Password match" +passwordMatch)
        if (passwordMatch == false) {
             res.status(403).json({ message: "Credenciales incorrectas" });
        }
        
        else {
            console.log('yepa');
            const token =generateToken(user);
            
            res.status(200).json({
                message:"Inicio de sesión exitoso",
                nombreUsuario: user.nombre,
                ApellidoUsuario: user.apellido,
                correoUsuario: user.email,
                rolUsuario : user.rol,
                idUsuario: user.id,
                departamentoUsuario:user.departamento,
                ciudadUsuario: user.ciudad,
                barrioUsuario:user.barrio,
                direccionUsuario: user.direccion,
                fechaNacimientoUsuario: user.fechanacimiento,
                generoUsuario: user.genero,
                uid : user.uid,
                token:token
                
                


            })
        }



    } catch(error:any){
         res.status(404).json({ message: error});
        console.log('Error:',error)

    }



}


