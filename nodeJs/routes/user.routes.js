//importar router
import { Router } from "express";
import {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const userRouter = Router();

/**
 * @routes GET/usuarios
 * @description Get all users 
 * @access Public 
 * @returns {Array} users 
 * @example GET http://localhost:3001/usuarios
 * @example GET http://localhost:3001/usuarios?name=juan
 */
userRouter.get("/usuarios", getUsers);

/**
 * @routes GET /usuarios/:id
 * @description Get users by ID
 * @access Public 
 * @returns {Object} users 
 * @example GET http://localhost:3001/usuarios/1
 */
userRouter.get("/usuarios/:id", getUserById);

/**
 * @routes POST /usuarios
 * @description Create new user
 * @access Public 
 * @returns {string} message 
 * @example POST http://localhost:3001/usuarios
 */
userRouter.post("/usuarios", createUser);

/**
 * @routes PATCH /usuarios/id:
 * @description Update user by ID
 * @access Public 
 * @returns {string} message 
 * @example PATCH http://localhost:3001/usuarios/1
 */
userRouter.patch("/usuarios/:id", updateUser);

/**
 * @routes DELETE /usuarios/id:
 * @description Delete user by ID
 * @access Public 
 * @returns {string} message 
 * @example DELETE http://localhost:3001/usuarios/1
 */
userRouter.delete("/usuarios/:id", deleteUser);

export default userRouter;