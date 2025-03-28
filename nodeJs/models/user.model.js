import mongoose from "mongoose"; //importar moongose
import moongoosePaginate from "mongoose-paginate-v2"; //importar modulo paginacion
import mongooseBcrypt from "mongoose-bcrypt";


/**
 * User Schema 
 * @type {mongoose} Schema 
 * @const userSchema - User schema 
 */
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return /^[a-zA-ZÀ-ÿ\s]+$/.test(value);
      },
      message: 'El nombre solo puede contener letras',
    }
  },
  email:{
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (value) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: 'El email no es valido',
    }
  },
  password: {
    type: String,
    required: true,
    bcrypt: true,
    validate: {
      validator: (value) => {
        return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(value);
      },
      message: 'La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un carácter'
    }
  },
},
{
  timestamps: true,
})


userSchema.plugin(moongoosePaginate);//agregar paginacion al esquema
userSchema.plugin(mongooseBcrypt);//agregar encriptacion

/**
 * User Model 
 * @type {mongoose} Schema 
 * @const userSchema - User schema 
 * @property {string} name - Name of the user 
 * @example nombre: "John"
 * @property {string} email - Email of the user 
 * @example email: "hola@hola.com"
 * @property {string} password - User Password
 * @example birthdate: "jonh@!123"
 * @property {date} createdAt - Date of creation
 * @default Date.now
 * @property {date} updateAt - Date of last update
 * @default Date.now
 */
const User = mongoose.model("User", userSchema);


//exportar modelo
export default User;