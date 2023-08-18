var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Expose } from 'class-transformer';
import { IsDefined, IsNumber, IsString, IsObject } from 'class-validator';
export class DTOlocales {
    constructor(nombre, direccion, estrellas) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.estrellas = estrellas;
    }
}
__decorate([
    Expose({ name: 'nombre' }),
    IsString({ message: () => { throw { status: 406, message: `El nombre no cumple con el formato` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro nombre es obligatorio` }; } }),
    __metadata("design:type", String)
], DTOlocales.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'direccion' }),
    IsObject({ message: () => { throw { status: 406, message: `La direccion no cumple con el formato` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro direccion es obligatorio` }; } }),
    __metadata("design:type", Object)
], DTOlocales.prototype, "direccion", void 0);
__decorate([
    Expose({ name: 'estrellas' }),
    IsNumber({}, { message: () => { throw { status: 406, message: `Las estrellas no cumple con el formato` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro estrellas es obligatorio` }; } }),
    __metadata("design:type", Number)
], DTOlocales.prototype, "estrellas", void 0);
