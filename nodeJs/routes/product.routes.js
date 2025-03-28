//importar router
import { Router } from "express";
import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

const productRouter = Router();

/**
 * @routes GET/productos
 * @description Get all products 
 * @access Public 
 * @returns {Array} products 
 * @example GET http://localhost:3001/productos
 */
productRouter.get("/productos", getProducts);

/**
 * @routes GET /productos/:id
 * @description Get products by ID
 * @access Public 
 * @returns {Object} products 
 * @example GET http://localhost:3001/productos/1
 */
productRouter.get("/productos/:id", getProductsById);

/**
 * @routes POST /productos
 * @description Create new product
 * @access Public 
 * @returns {string} message 
 * @example POST http://localhost:3001/productos
 */
productRouter.post("/productos", createProduct);

/**
 * @routes PATCH /productos/id:
 * @description Update product by ID
 * @access Public 
 * @returns {string} message 
 * @example PATCH http://localhost:3001/productos/1
 */
productRouter.patch("/productos/:id", updateProduct);

/**
 * @routes DELETE /productos/id:
 * @description Delete product by ID
 * @access Public 
 * @returns {string} message 
 * @example DELETE http://localhost:3001/productos/1
 */
productRouter.delete("/productos/:id", deleteProduct);

export default productRouter;