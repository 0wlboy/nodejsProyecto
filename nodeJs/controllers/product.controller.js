import Product from "../models/product.model.js";//importar modelo

/**
 * 
 * @route GET /productos 
 * @description GET all products
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Array} products 
 * @example GET http://localhost:3001/productos
 * @example GET http://localhost:3001/usuarios?name=cepillo 
 * */
export const getProducts = async (req, res) =>{
  const {name, page =1} = req.query;
  const limit = 10;
  if(name){
    name = RegExp(name,"i");
  }
  try{
    const products = await Product.paginate(name, {page, limit});
    res.status(200).json(products);
  }catch(error){
    res.status(500).send(error.message);
  }
}

/**
 * 
 * @route GET /productos/:id 
 * @description GET productos by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} productos 
 * @example GET http://localhost:3001/productos/1
 */
export const getProductsById = async (req, res) =>{
  const id = req.params.id;
  try{
    const product = await Product.findById(id);
    if(product){
      res.json(product);
    }else{
      res.status(404).send("Producto no encontrado");
    }
  }catch(error){
    res.status(500).send(error.message);
  }
}

/**
 * 
 * @route POST /productos 
 * @description Create new product
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {string} req.body.name - Name
 * @param {string} req.body.description - Description
 * @param {Number} req.body.price - Price
 * @param {Number} req.body.stock - Stock
 * @returns {string} message 
 * @example GET http://localhost:3001/productos
 */
export const createProduct = async (req, res) =>{
  const {name, description, price, stock} = req.body;
  try{
    const product = new Product({name, description, price, stock});
    await product.save();
    res.status(201).send("Producto creado");
  }catch(error){
    //manejar un error de conexion 
    if(error.name === 'ValidationError'){
       res.status(400).send({error: error.message});
    }else if(error.name === 'MongoServerError' && error.code === 11000){
      res.status(400).send("El nombre de producto ya existe");
    }else{
      res.status(500).send("Error interno del servidor");
    }
  }
}

/**
 * 
 * @route PUT /productos/:id 
 * @description Update a product by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {string} req.body.name - Name
 * @param {string} req.body.description - Description
 * @param {Number} req.body.price - Price
 * @param {Number} req.body.stock - Stock
 * @returns {string} message 
 * @example GET http://localhost:3001/productos/1
 */
export const updateProduct = async (req, res) =>{
  const id =req.params.id;
  const {name, description, price, stock} = req.body;
  try{
    const product = await Product.findByIdAndUpdate(
      id, 
      {name, description, price, stock}, 
      {runValidators: true});
      if (product){
        res.status(200).send("Producto actualizado");
      }else{
        res.status(404).send("Producto no encontrado");
      }
  }catch(error){
    if(error.name === "ValidationError"){
      res.status(400).send({error: error.message});
    } else {
      res.status(500).send("Error interno del servidor");
    }
  }
};

/**
 * 
 * @route DELETE /productos/:id 
 * @description Delete a product by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {string} message 
 * @example GET http://localhost:3001/productos/1
 */
export const deleteProduct = async (req, res) =>{
  const id = req.params.id;
    try{
      const product = await Product.findByIdAndDelete(id);
      if(product){
        res.status(200).send("Producto eliminado");
      }else{
        res.status(404).send("Producto no encontrado");
      }
    }catch(error){
      res.status(500).send(error.message);
    }
}