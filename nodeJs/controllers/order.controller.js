import Order from "../models/order.model.js";//importar modelo

/**
 * 
 * @route GET /ordenes 
 * @description GET all orders
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Array} orders 
 * @example GET http://localhost:3001/ordenes
 * */
export const getOrders = async (req, res) =>{
  const userId = req.query.userId;
  const page =1;
  const limit = 10;
  try{
    const order = await Order.paginate(userId, {page, limit});
    res.status(200).json(order);
  }catch(error){
    res.status(500).send(error.message);
  }
}

/**
 * 
 * @route GET /ordenes/:id 
 * @description GET order by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} order 
 * @example GET http://localhost:3001/ordenes/1
 */
export const getOrderById = async (req, res) =>{
  const id = req.params.id;
  try{
    const order = await Order.findById(id);
    if(order){
      res.json(order);
    }else{
      res.status(404).send("Orden no encontrada");
    }
  }catch(error){
    res.status(500).send(error.message);
  }
}

/**
 * 
 * @route POST /ordenes 
 * @description Create new order
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {ObjectId} req.body.userId - user ID, referencing  User collection
 * @param {Array} req.body.items - Array of Objects
 * @param {ObjectId} req.body.items.productID - Product ID, referencing Product collection
 * @param {Number} req.body.items.quantity - Product quantity 
 * @param {Number} req.body.items.unitPrice - Unit Price 
 * @param {Number} req.body.total - Total price
 * @returns {string} message 
 * @example GET http://localhost:3001/ordenes
 */
export const createOrder = async (req, res) =>{
  console.log("req.body:", req.body);
  const {userId, items, total} = req.body;
  try{
    const order = new Order({userId,items, total});
    await order.save();
    res.status(201).send("Orden creada");
  }catch(error){
    //manejar un error de conexion 
    if(error.name === 'ValidationError'){
       res.status(400).send({error: error.message});
    }else{
      res.status(500).send("Error interno del servidor");
    }
  }
}

/**
 * 
 * @route PATCH /ordenes/:id 
 * @description Update a order by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {string} req.body.userId - Id of the user
 * @param {Array} req.body.items - Objects that the user buy
 * @param {Number} req.body.total - Total price
 * @returns {string} message 
 * @example GET http://localhost:3001/ordenes/1
 */
export const updateOrder = async (req, res) =>{
  const id =req.params.id;
  const updates = req.body;
  try{
    const updateOperations ={};

    for (const key in updates) {
      if (key === 'userId' || key === 'total') {
        updateOperations[key] = updates[key];
      } else if (key === 'items' && Array.isArray(updates.items)) {
        // Si se proporciona un nuevo array 'items', se reemplaza completamente (opcional)
        updateOperations.items = updates.items;
      } else if (key.startsWith('items.$[].')) {
        // Para actualizar propiedades dentro de los objetos del array 'items'
        // Ejemplo de cómo el cliente podría enviar: 'items.0.quantity': 5
        updateOperations[`${key}`] = updates[key];
      }
    }


    const order = await Order.findByIdAndUpdate(
      {_id:id}, 
      {$set: updateOperations}, 
      {new: true,runValidators: true});
      if (order){
        res.status(200).send("Orden actualizada");
      }else{
        res.status(404).send("Orden no encontrada");
      }
  }catch(error){
    if(error.name === "ValidationError"){
      res.status(400).send({error: error.message});
    } else {
      console.error("Error al actualizar la orden: ",error);
      res.status(500).send("Error interno del servidor");
    }
  }
};

/**
 * 
 * @route DELETE /ordenes/:id 
 * @description Delete a order by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {string} message 
 * @example GET http://localhost:3001/ordenes/1
 */
export const deleteOrder = async (req, res) =>{
  const id = req.params.id;
    try{
      const order = await Order.findByIdAndDelete(id);
      if(order){
        res.status(200).send("Orden eliminada");
      }else{
        res.status(404).send("Orden no encontrada");
      }
    }catch(error){
      res.status(500).send(error.message);
    }
}