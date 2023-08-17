import { Expose, Transform } from 'class-transformer';
import { IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString, IsBoolean, IsArray, ValidateNested, IsObject } from 'class-validator';
export class DTOlocales {

    @Expose({ name: 'nombre' })
    @IsString({message: ()=>{ throw {status: 406, message: `El nombre no cumple con el formato`}}})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El parametro nombre es obligatorio`}}})
    nombre: string;

    @Expose({ name: 'departamento' })
    @IsString({message: ()=>{ throw {status: 406, message: `La departamento no cumple con el formato`}}})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La parametro departamento es obligatorio`}}})
    departamento: string;

    @Expose({ name: 'barrio' })
    @IsString({message: ()=>{ throw {status: 406, message: `El barrio no cumple con el formato`}}})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El parametro barrio es obligatorio`}}})
    barrio: string;

    @Expose({ name: 'comentario' })
    @IsString({message: ()=>{ throw {status: 406, message: `El comentario no cumple con el formato`}}})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El parametro comentario es obligatorio`}}})
    comentario: string;

    @Expose({ name: 'clave' })
    @IsString({message: ()=>{ throw {status: 406, message: `La clave no cumple con el formato`}}})
    @IsDefined({message: ()=>{ throw {status: 422, message: `La parametro es obligatorio`}}})
    clave: string;


    @Expose({ name: 'direccion' })
    @ValidateNested({ each: true })
    @IsDefined({ message: 'La direccion es obligatoria' })
    direccion: object;

    constructor(
        nombre: string,
        departamento: string,
        barrio: string,
        comentario: string,
        clave: string,
    ){
        this.nombre = nombre;
        this.departamento = departamento;
        this.barrio = barrio;
        this.comentario = comentario;
        this.clave = clave;
        this.direccion = { departamento,barrio,comentario,clave };
    }
}