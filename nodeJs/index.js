import express, { json } from 'express'; //importamos express
import cors from "cors"; //importar cors
import userRouter from './routes/user.routes.js'; //importar rutas de usuarios
import productRouter from './routes/product.routes.js'; //importar rutas de productos
import orderRouter from './routes/order.routes.js'; //importar rutas de ordenes
import "./database/connection.js" //importar conexion a base de datos

const app = express(); // Crear el servidor ejecutando express
const port = 3001;//crear un puerto
//crear una lista blanca con los origenes permitidos 
const whiteList = ["http://localhost:3000","http://localhost:3001", "http://localhost:5173"];

//configurar cors
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Acceso no permitido"));
    }
  },
};

app.use(cors(corsOptions)); //usar cors
app.use(json());// Middleware para parsear JSON

app.use([userRouter,productRouter,orderRouter]); //usar rutas

//iniciar servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});