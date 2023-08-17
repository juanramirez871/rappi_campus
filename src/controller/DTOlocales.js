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
import { IsDefined, IsString, ValidateNested } from 'class-validator';
export class DTOlocales {
    constructor(nombre, departamento, barrio, comentario, clave) {
        this.nombre = nombre;
        this.departamento = departamento;
        this.barrio = barrio;
        this.comentario = comentario;
        this.clave = clave;
        this.direccion = { departamento, barrio, comentario, clave };
    }
}
__decorate([
    Expose({ name: 'nombre' }),
    IsString({ message: () => { throw { status: 406, message: `El nombre no cumple con el formato` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro nombre es obligatorio` }; } }),
    __metadata("design:type", String)
], DTOlocales.prototype, "nombre", void 0);
__decorate([
    Expose({ name: 'departamento' }),
    IsString({ message: () => { throw { status: 406, message: `La departamento no cumple con el formato` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: `La parametro departamento es obligatorio` }; } }),
    __metadata("design:type", String)
], DTOlocales.prototype, "departamento", void 0);
__decorate([
    Expose({ name: 'barrio' }),
    IsString({ message: () => { throw { status: 406, message: `El barrio no cumple con el formato` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro barrio es obligatorio` }; } }),
    __metadata("design:type", String)
], DTOlocales.prototype, "barrio", void 0);
__decorate([
    Expose({ name: 'comentario' }),
    IsString({ message: () => { throw { status: 406, message: `El comentario no cumple con el formato` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: `El parametro comentario es obligatorio` }; } }),
    __metadata("design:type", String)
], DTOlocales.prototype, "comentario", void 0);
__decorate([
    Expose({ name: 'clave' }),
    IsString({ message: () => { throw { status: 406, message: `La clave no cumple con el formato` }; } }),
    IsDefined({ message: () => { throw { status: 422, message: `La parametro es obligatorio` }; } }),
    __metadata("design:type", String)
], DTOlocales.prototype, "clave", void 0);
__decorate([
    Expose({ name: 'direccion' }),
    ValidateNested({ each: true }),
    IsDefined({ message: 'La direccion es obligatoria' }),
    __metadata("design:type", Object)
], DTOlocales.prototype, "direccion", void 0);
