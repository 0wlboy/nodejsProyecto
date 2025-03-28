import mongoose from "mongoose"; //importar moongose
import moongoosePaginate from "mongoose-paginate-v2"; //importar modulo paginacion



/**
 * Order Schema 
 * @type {mongoose} Schema 
 * @const orderSchema - Order schema 
 */
const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref:'User',
    required: true,
  },
  items:[
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref:'Product',
        required: true,
      },
      quantity:{
        type: Number,
        required: true,
        min:1,
      },
      unitPrice:{
        type:Number,
        required: true,
        min:0,
      }
    }
  ],
  total: {
    type: Number,
    required: true,
    validate: {
      validator: (value) => {
        return typeof value === 'number' && value > 0;
      },
      message: 'El total debe ser un nuemro mayor a 0'
    }
  },
},
{
  timestamps: true,
})

//agregar paginacion al esquema
orderSchema.plugin(moongoosePaginate);

/**
 * User Model 
 * @type {mongoose} Schema 
 * @const orderSchema - Order schema 
 * @property {ObjectId} userId - Id of the user, reference from the collection User 
 * @example userId: "65a5c8e29a998826d9e0783d"
 * @property {ArrayObject} items - Array with the products ordered 
 * @property {ObjectId} items.productId - Id of the product
 * @example productId: "65a5c8e29a998826d9e0783d"
 * @property {NUmber} items.quantity - Quantity of the product
 * @example quantity: 12
 * @property {NUmber} items.unitPrice - Unit price of the product
 * @example quantity: 30
 * @property {Number} total - Total of the purchase
 * @example price: 100
 * @property {date} createdAt - Date of creation
 * @default Date.now
 * @property {date} updateAt - Date of last update
 * @default Date.now
 */
const Order = mongoose.model("Order", orderSchema);

//exportar modelo
export default Order;