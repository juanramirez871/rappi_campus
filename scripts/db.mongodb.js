use("rappi-campus")

db.createCollection("usuarios",
{
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombres", "edad", "password", "email", "vip", "role", "activo"],
            properties: {
                nombres: {
                    bsonType: "object",
                    required: ["nombre", "apellido"],
                    properties: {
                        nombre: { bsonType: "string", description: "El nombre es obligatorio y debe ser de tipo string." },
                        apellido: { bsonType: "string", description: "El apellido es obligatorio y debe ser de tipo string." }
                    }
                },
                edad: { bsonType: "int", minimum: 0, description: "La edad es obligatoria y debe ser un número entero." },
                direccion: {
                    bsonType: "object",
                    properties: {
                        departamento: { bsonType: "string", description: "El departamento debe ser de tipo string." },
                        barrio: { bsonType: "string", description: "El barrio debe ser de tipo string." },
                        comentario: { bsonType: "string", description: "El comentario debe ser de tipo string." },
                        clave: { bsonType: "string", description: "El clave debe ser de tipo string." }
                    }
                },
                password: { bsonType: "string", description: "La contraseña es obligatoria y debe ser de tipo string." },
                email: {
                    bsonType: "string",
                    pattern: "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
                    description: "El email es obligatorio"
                },
                vip: { bsonType: "int", enum: [0, 1], description: "El campo VIP es obligatorio y debe ser 0 o 1." },
                role: { bsonType: "int", enum: [0, 1], description: "El campo role es obligatorio y debe ser 0 o 1." },
                activo: { bsonType: "int", enum: [0, 1], description: "El campo activo es obligatorio y debe ser 0 o 1." },
                cupones: {
                    bsonType: "array",
                    items: { bsonType: "objectId", description: "El campo cupones debe ser una matriz de ObjectIds." }
                }
            }
        }
    }
}
)

db.usuarios.insertMany([
    {
        nombres: {
            nombre: "usuario1",
            apellido: "apellido1"
        },
        edad: 18,
        direccion: {
            departamento: "santander",
            barrio: "san carlos",
            comentario: "algun comentario",
            clave: "12a #bf"
        },
        password: "123",
        email: "juan@gmail.com",
        vip: 1,
        role: 1,
        activo: 1,
        cupones: [ObjectId("64d26d1e0900c20b3b9db0e8"), ObjectId("64d26d1e0900c20b3b9db0e8"), ObjectId("64d26d1e0900c20b3b9db0e8")]
    }
])

db.createCollection("cupones", 
{
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "descuento", "tiempoValido"],
            properties: {
                nombre: { bsonType: "string", description: "El nombre del cupón es obligatorio y debe ser de tipo string." },
                descuento: { bsonType: "int", description: "El descuento del cupón es obligatorio y debe ser de tipo entero." },
                tiempoValido: { bsonType: "string", description: "El tiempo válido del cupón es obligatorio y debe ser de tipo string." }
            }
        }
    }
}

)

db.cupones.insertMany([
    {
        nombre: "cupon 1",
        descuento: 100,
        tiempoValido: "100d"
    }
])

db.createCollection("locales", 
{
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["nombre", "direccion", "estrellas", "vip", "categorias", "horario", "activo"],
            properties: {
                nombre: { bsonType: "string", description: "El nombre del local es obligatorio y debe ser de tipo string." },
                direccion: {
                    bsonType: "object",
                    required: ["departamento", "barrio", "clave"],
                    properties: {
                        departamento: { bsonType: "string", description: "El departamento es obligatorio y debe ser de tipo string." },
                        barrio: { bsonType: "string", description: "El barrio es obligatorio y debe ser de tipo string." },
                        comentario: { bsonType: "string", description: "El comentario es obligatorio y debe ser de tipo string." },
                        clave: { bsonType: "string", description: "La clave es obligatoria y debe ser de tipo string." }
                    }
                },
                estrellas: { bsonType: "int", minimum: 1, maximum: 5, description: "La calificación de estrellas es obligatoria y debe ser un número entre 1 y 5." },
                vip: { bsonType: "bool", description: "El campo VIP es obligatorio y debe ser de tipo booleano." },
                categorias: {
                    bsonType: "array",
                    items: { bsonType: "string", description: "Las categorías deben ser una matriz de strings." }
                },
                horario: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["dia", "horas"],
                        properties: {
                            dia: { bsonType: "string", description: "El día del horario es obligatorio y debe ser de tipo string." },
                            horas: { bsonType: "string", description: "Las horas del horario son obligatorias y deben ser de tipo string." }
                        }
                    }
                },
                activo: { bsonType: "int", enum: [0, 1], description: "El campo activo es obligatorio y debe ser 0 o 1." },
                faq: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                        required: ["pregunta", "respuesta"],
                        properties: {
                            pregunta: { bsonType: "string", description: "La pregunta del FAQ es obligatoria y debe ser de tipo string." },
                            respuesta: { bsonType: "string", description: "La respuesta del FAQ es obligatoria y debe ser de tipo string." }
                        }
                    }
                },
                productos: {
                    bsonType: "array",
                    items: {
                        bsonType: "object",
                    }
                }
            }
        }
    }
}


)

db.locales.insertMany([
    {
        nombre: "local 1",
        direccion: {
            departamento: "santander",
            barrio: "san carlos",
            comentario: "algun comentario",
            clave: "12a #12-21"
        },
        estrellas: 4,
        vip: true,
        categorias: ["ropa"],
        horario: [
            {
                dia: "lunes",
                horas: "10am - 5pm"
            }
        ],
        activo: 1,
        faq: [
            {
                pregunta: "alguna pregunta",
                respuesta: "alguna respuesta"
            }
        ],
        productos: [
            {
                name: "producto 1",
                precio: 100,
                descripcion: "alguna descripcion",
                descuento: 1,
                categorias: ["alguna categoria"],
                tiempoEstimado: 10,
                costoEnvio: 10
            }
        ]
    }
])


db.createCollection("pedidos", 
{
    validator: {
        $jsonSchema: {
            bsonType: "object",
            required: ["usuarioId", "productos", "costoTotal", "descuentoTotal", "fechaPedido", "tiempoFinalEntrega", "domiciliarioId", "estado"],
            properties: {
                usuarioId: { bsonType: "objectId", description: "El usuarioId es obligatorio y debe ser un ObjectId válido." },
                productos: {
                    bsonType: "array",
                    items: { bsonType: "objectId", description: "Los productos deben ser una matriz de ObjectIds válidos." }
                },
                costoTotal: { bsonType: "int", minimum: 0, description: "El costo total es obligatorio y debe ser un número mayor o igual a 0." },
                descuentoTotal: { bsonType: "int", minimum: 0, description: "El descuento total es obligatorio y debe ser un número mayor o igual a 0." },
                fechaPedido: { bsonType: "string",  description: "La fecha del pedido es obligatoria y debe estar en el M-DD'." },
                tiempoFinalEntrega: { bsonType: "string",  description: "El tiempo final de entrega es obligatorio y debe estar en el M-DD'." },
                domiciliarioId: { bsonType: "objectId", description: "El domiciliarioId es obligatorio y debe ser un ObjectId válido." },
                estado: { bsonType: "int", description: "El estado del pedido es obligatorio." }
            }
        }
    }
}

)

db.pedidos.insertMany([
    {
        usuarioId: ObjectId("64d26d1e0900c20b3b9db0e8"),
        productos: [ObjectId("64d26d1e0900c20b3b9db0e8"), ObjectId("64d26d1e0900c20b3b9db0e8"), ObjectId("64d26d1e0900c20b3b9db0e8")],
        costoTotal: 100,
        descuentoTotal: 20,
        fechaPedido: "2023-03-04",
        tiempoFinalEntrega: "2209-03-02",
        domiciliarioId: ObjectId("64d26d1e0900c20b3b9db0e8"),
        estado: 4
    }
])