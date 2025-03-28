//importar el modelo 
import User from "../models/user.model.js";


/**
 * 
 * @route GET /usuarios 
 * @description GET all users
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Array} users 
 * @example GET http://localhost:3001/usuarios
 * @example GET http://localhost:3001/usuarios?name=juan
 */
export const getUsers = async (req, res) =>{
  const {name, page =1} = req.query;
  const limit = 10;
  if(name){
    name = RegExp(name,"i");
  }
  try{
    const users = await User.paginate(name, {page, limit});
    res.status(200).json(users);
  }catch(error){
    res.status(500).send(error.message);
  }
}

/**
 * 
 * @route GET /usuarios/:id 
 * @description GET user by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {Object} users 
 * @example GET http://localhost:3001/usuarios/1
 */
export const getUserById = async (req, res) =>{
  const id = req.params.id;
  try{
    const user = await User.findById(id);
    if(user){
      res.json(user);
    }else{
      res.status(404).send("Usuario no encontrado");
    }
  }catch(error){
    res.status(500).send(error.message);
  }
}

/**
 * 
 * @route POST /usuarios 
 * @description Create new user
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {string} req.body.name - Name
 * @param {string} req.body.email - Email
 * @param {string} req.body.password - password
 * @returns {string} message 
 * @example GET http://localhost:3001/users
 */
export const createUser = async (req, res) =>{
  const {name, email, password} = req.body;
  try{
    const user = new User({name, email, password});
    await user.save();
    res.status(201).send("Usuario creado");
  }catch(error){
    //manejar un error de conexion 
    if(error.name === 'ValidationError'){
       res.status(400).send({error: error.message});
    }else if(error.name === 'MongoServerError' && error.code === 11000){
      res.status(400).send("El nombre de usuario o email ya existe");
    }else{
      res.status(500).send("Error interno del servidor");
    }
  }
}

/**
 * 
 * @route PATCH /usuarios/:id 
 * @description Update user by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {string} req.body.name - Name
 * @param {string} req.body.email - Email
 * @param {string} req.body.password - Passwrod
 * @returns {string} message 
 * @example GET http://localhost:3001/usuarios/1
 */
export const updateUser = async (req, res) =>{
  const id =req.params.id;
  const {name, email, password} = req.body;
  try{
    const user = await User.findByIdAndUpdate(
      id, 
      {name, email, password}, 
      {runValidators: true});
      if (user){
        res.status(200).send("Usuario actualizado");
      }else{
        res.status(404).send("Usuario no encontrado");
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
 * @route DELETE /usuarios/:id 
 * @description Delete user by ID
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @returns {string} message 
 * @example GET http://localhost:3001/usuarios/1
 */
export const deleteUser = async (req, res) =>{
  const id = req.params.id;
    try{
      const user = await User.findByIdAndDelete(id);
      if(user){
        res.status(200).send("Usuario eliminado");
      }else{
        res.status(404).send("Usuario no encontrado");
      }
    }catch(error){
      res.status(500).send(error.message);
    }
}

