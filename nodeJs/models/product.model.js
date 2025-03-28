import mongoose from "mongoose"; //importar moongose
import moongoosePaginate from "mongoose-paginate-v2"; //importar modulo paginacion



/**
 * Product Schema 
 * @type {mongoose} Schema 
 * @const productSchema - Product schema 
 */
const productSchema = new mongoose.Schema({
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
  description:{
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        return  /^[a-zA-Z0-9_.-À-ÿ\s]+$/.test(value);
      },
      message: 'La descripcion no puede contener caracteres especiales',
    }
  },
  price: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return typeof value === 'number' && value > 0;
      },
      message: 'El precio debe ser un nuemro mayor a 0'
    }
  },
  stock: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return typeof value === 'number' && value >= 0;
      },
      message: 'El stock debe ser un nuemro mayor o igual a 0'
    }
  }
},
{
  timestamps: true,
})

//agregar paginacion al esquema
productSchema.plugin(moongoosePaginate);

/**
 * User Model 
 * @type {mongoose} Schema 
 * @const productSchema - Product schema 
 * @property {string} name - Name of the product 
 * @example name: "cepillo"
 * @property {string} descripcion - Description of the product 
 * @example description: "Es un cepillo para cepillar dientes"
 * @property {number} price - Price of the product
 * @example price: 12
 * @property {number} stock - Stock of the product
 * @example stock: 4
 * @property {date} createdAt - Date of creation
 * @default Date.now
 * @property {date} updateAt - Date of last update
 * @default Date.now
 */
const Product = mongoose.model("Product", productSchema);

//exportar modelo
export default Product;