import mongoose from 'mongoose';//importar moongose

//crear conexion a la base de datos
mongoose.connect('mongodb://localhost:27017/Tienda');

// verificar conexion
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Error de conexion'));
db.once('open', () => {
  console.log('Conectado a MongoDB');
});

export default db; // exportar conexion a la base de datos

