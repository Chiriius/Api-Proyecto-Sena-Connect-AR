export interface User {
    id :number;
    uid : string;
    email:string;
    password:string;
    nombre:string;
    apellido:string;
    departamento:string;
    ciudad:string;
    barrio:string;
    direccion:string;
    genero:string;
    rol : number;
    fechaNacimiento?:Date | null;
    fechaRegistro? : Date | null;

    


}