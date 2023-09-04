# Rappi Campus

### Integrantes

* Jose Daniel Nova Muñoz

* Ludwing Santiago Villamizar Murillo

* Juan Diego Ramirez Mogotocoro

## Investigacion sobre rappi

![img](./public/img/rappi.jpg)


El modelo de negocio de Rappi se basa en una plataforma tecnológica que conecta a usuarios con una amplia variedad de servicios y productos a través de su aplicación móvil y plataforma web. Su enfoque principal es la entrega a domicilio, donde los usuarios pueden solicitar alimentos de restaurantes locales, compras de supermercado, productos de farmacia y más. Mediante una red de repartidores conocidos como "Rappitenderos", Rappi recoge los productos de comercios asociados y los entrega directamente en las ubicaciones de los usuarios. Además, Rappi ha diversificado su oferta para incluir servicios como envío de paquetes, trámites bancarios y más, aumentando su utilidad en diferentes contextos. Su colaboración con una variedad de establecimientos comerciales y su enfoque en la innovación constante son pilares fundamentales de su modelo, permitiéndoles proporcionar soluciones convenientes y rápidas a través de pagos digitales y una experiencia de usuario simplificada.

### Pilares Fundamentales de Rappi que se usaran en el proyecto

1. Entrega a Domicilio

Rappi se basa en una red de repartidores, conocidos como Rappitenderos, que desempeñan un papel crucial en la plataforma. Estos repartidores recogen los productos solicitados por los usuarios y los entregan directamente en sus hogares u oficinas. La entrega rápida y eficiente es esencial para la experiencia de usuario de Rappi.

2. Variedad de Servicios

Además de la entrega de alimentos, Rappi ha diversificado su oferta para incluir una amplia gama de servicios. Esto abarca desde compras de supermercado y farmacia hasta entrega de alcohol y envío de paquetes. La variedad de servicios disponibles amplía la utilidad de la plataforma para los usuarios.

3. Colaboración con Comercios

Rappi establece colaboraciones estratégicas con diversos establecimientos comerciales, tales como restaurantes, supermercados y tiendas. Esta colaboración permite a Rappi ofrecer un catálogo extenso de productos y servicios. Los usuarios pueden elegir entre una amplia gama de opciones gracias a estas asociaciones.

## Instalacion

#### clone o descargue el repositorio donde esta leyendo esto, al tenerlo entra a la carpeta creada y ejecuta  ```npm install``` crea un nuevo archivo llamado ```.env``` y escriba dentro de el lo siguiente

```
URI_MONGODB = 
PORT = 3000
JWT_SECRET = "fklsdfjkld"
```

#### Ejecuta en la terminal ```npm run dev```

### Crea un usuario para poder acceder a todos los enpoints con el siguiente enpoint

```Metodo POST - http://127.10.10.10:3000/api/registro  ```
Datos de ejemplo en el body

```json
{
  "nombres": {
    "nombre": "Miguel chiquito",
    "apellido": "Backend"
  },
  "edad": 50,
  "direccion": {
    "departamento": "Piedecuesta",
    "barrio": "san justo y bueno",
    "comentario": "algun comentario",
    "clave": "12a #bfAdmin"
  },
  "password": "123",
  "email": "miguel2@gmail.com",
  "vip": 1,
  "activo": 1
}
```

### Despues deberas loguearse, te recomendamos utilizar este usuario que ya es admin y tiene muchos datos de ejemplo para probar los enpoints

```
Metodo POST - http://127.10.10.10:3000/api/login
{
  "correo": "ludsan@gmail.com",
  "contraseña": "321123"
}
```

### Te dara un token copialo en la cabecera *Authorization* asi ```bearer aqui tu token generado```

Ademas debes poner otra cabecera llamada *Accept-version* y especificar la version, en este caso para el admin la por default es la ```1.0.0```

### Documentacion de las APIS

#### Metodos GET

| metodo | url                                                          | body                                           | Descripcion                                                  | Versiones |
| ------ | ------------------------------------------------------------ | ---------------------------------------------- | ------------------------------------------------------------ | --------- |
| GET    | http://127.10.10.10:3000/api/usuarios/horarios/:idLocal      | NO                                             | Trae el horario de un local                                  | 1.0.0     |
| GET    | http://127.10.10.10:3000/api/usuarios/categorias/locales     | { "categorias": ["ropa", "alguna categoria"] } | Trae todos los locales que esten en la categoras dichas      | 1.0.0     |
| GET    | http://127.10.10.10:3000/api/productos/categorias            | { "categorias": ["ropa", "plays4"] }           | Trae todos los productos que esten en la categoras dichas    | 1.0.0     |
| GET    | http://127.10.10.10:3000/api/usuarios/domiciliario/:idDomiciliario/pedidos | NO                                             | Trae el numero de domicilios ha hecho el domiciliarios especificado | 1.0.0     |
| GET    | http://127.10.10.10:3000/api/usuarios/obtener                | NO                                             | Trae todos los locales con su respectiva información         | 1.0.0     |
| GET    | http://127.10.10.10:3000/api/locales/obtener/Local           | NO                                             | Trae un local en especifico según el id del Token generado   | 1.0.0     |
| GET    | http://127.10.10.10:3000/api/usuarios/obtener/pedidos        | NO                                             | Trae un pedido en especifico según el id del Token generado  | 1.0.0     |
| GET    | http://127.10.10.10:3000/api/usuarios/obtener/recibo/:id     | NO                                             | Trae un recibo detallado de pedido                           | 1.0.0     |
| GET    | http://127.10.10.10:3000/api/usuarios/obtener/local/departamento/:departamento | NO                                             | Trae los locales por departamento                            | 1.0.0     |
| GET    | http://127.10.10.10:3000/api/usuarios/obtener/local/barrio/:barrio | NO                                             | Trae los locales por barrio                                  | 1.0.0     |

#### Metodos POST

| metodo | url                                                    | body                                                         | Descripcion                         | Versiones |
| ------ | ------------------------------------------------------ | ------------------------------------------------------------ | ----------------------------------- | --------- |
| POST   | http://127.10.10.10:3000/api/cupones                   | {"nombre":"cupon 1","descuento": 100, "tiempoValido": "100d"} | Agrega un nuevo cupon               | 1.0.0     |
| POST   | http://127.10.10.10:3000/api/locales/:idLocal/producto | {"name": "producto 1", "precio": 100, "descripcion": "alguna descripcion", "descuento": 1, "categorias": ["alguna categoria"],"tiempoEstimado": 10, "costoEnvio": 10} | Agrega un nuevo producto a un local | 1.0.0     |
| POST   | http://127.10.10.10:3000/api/usuarios/agregar/local    | {"nombre": "local 1","direccion": {"departamento": "santander","barrio": "san carlos","comentario": "algun comentario","clave": "12a #12-21"},"estrellas": 4,"vip": true,"categorias": ["ropa"],"horario": [{"dia": "lunes","horas": "10am - 5pm"}],"activo": 1,"faq": [{"pregunta": "alguna pregunta","respuesta": "alguna respuesta"}],"productos": []} | Agrega un nuevo local               | 1.0.0     |
| POST   | http://127.10.10.10:3000/api/usuarios/agregar/pedidos  | {"localId": "64e676c0aae9ada8e08ac734","productos": ["64e678bf03f53f7aa07ee2ce"],"costoTotal": 100000,"descuentoTotal": 20,"fechaPedido": "2023-03-04","tiempoFinalEntrega": "2209-03-02","domiciliarioId": "64d26d1e0900c20b3b9db0e8","estado": 4} | Agrega un nuevo pedido              | 1.0.0     |

#### Metodos PUT

| metodo | url                                                          | body                                                         | Descripcion                    | Versiones |
| ------ | ------------------------------------------------------------ | ------------------------------------------------------------ | ------------------------------ | --------- |
| PUT    | http://127.10.10.10:3000/api/locales/actualizar              | {"nombre": "local 1","direccion": {"departamento": "santander","barrio": "san carlos","comentario": "algun comentario","clave": "12a #12-21"},"estrellas": 4,"vip": true,"categorias": ["ropa"],"horario": [{"dia": "lunes","horas": "10am - 5pm"}],"activo": 1,"faq": [{"pregunta": "alguna pregunta","respuesta": "alguna respuesta"}],"productos": []} | Actualiza un cabio del local   | 1.0.0     |
| PUT   | http://127.10.10.10:3000/api/usuarios/actualizar/estado/pedido/:id/:estado | NO                                                           | Actualiza el estado del pedido | 1.0.0     |


#### Metodos DELETE

| metodo | url                                                        | body | Descripcion       | Versiones |
| ------ | ---------------------------------------------------------- | ---- | ----------------- | --------- |
| DELETE | http://127.10.10.10:3000/api/locales/eliminar              | NO   | Elimina un local  | 1.0.0     |
| DELETE | http://127.10.10.10:3000/api/usuarios/eliminar/pedidos/:id | NO   | Elimina un pedido | 1.0.0     |