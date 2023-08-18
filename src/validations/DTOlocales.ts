import { Expose, Transform } from 'class-transformer';
import { IsDefined, MaxLength, MinLength, IsNumber, IsEmail, IsString, IsBoolean, IsArray, ValidateNested, IsObject, IsInt, Min, Max } from 'class-validator';
export class DTOlocales {

    @Expose({ name: 'nombre' })
    @IsString({message: ()=>{ throw {status: 406, message: `El nombre no cumple con el formato`}}})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El parametro nombre es obligatorio`}}})
    nombre: string;

    @Expose({ name: 'direccion' })
    @IsObject({message: ()=>{ throw {status: 406, message: `La direccion no cumple con el formato`}}})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El parametro direccion es obligatorio`}}})
    direccion: object;

    @Expose({ name: 'estrellas' })
    @IsNumber({}, {message: ()=>{ throw {status: 406, message: `Las estrellas no cumple con el formato`}}})
    @IsDefined({message: ()=>{ throw {status: 422, message: `El parametro estrellas es obligatorio`}}})
    estrellas: number;


    constructor(
        nombre: string,
        direccion: object,
        estrellas: number,
    ){
        this.nombre = nombre;
        this.direccion = direccion;
        this.estrellas = estrellas;
    }
}