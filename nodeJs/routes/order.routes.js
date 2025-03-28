//importar router
import { Router } from "express";
import {
  getOrders,
  getOrderById,
  createOrder,
  updateOrder,
  deleteOrder,
} from "../controllers/order.controller.js";

const orderRouter = Router();

/**
 * @routes GET/ordenes
 * @description Get all orders 
 * @access Public 
 * @returns {Array} orders 
 * @example GET http://localhost:3001/ordenes
 */
orderRouter.get("/ordenes", getOrders)

/**
 * @routes GET /ordenes/:id
 * @description Get order by ID
 * @access Public 
 * @returns {Object} order
 * @example GET http://localhost:3001/ordenes/1
 */
orderRouter.get("/ordenes/:id", getOrderById);

/**
 * @routes POST /ordenes
 * @description Create new order
 * @access Public 
 * @returns {string} message 
 * @example POST http://localhost:3001/ordenes
 */
orderRouter.post("/ordenes", createOrder);

/**
 * @routes PATCH /ordenes/id:
 * @description Update order by ID
 * @access Public 
 * @returns {string} message 
 * @example PATCH http://localhost:3001/ordenes/1
 */
orderRouter.patch("/ordenes/:id", updateOrder);

/**
 * @routes DELETE /ordenes/id:
 * @description Delete order by ID
 * @access Public 
 * @returns {string} message 
 * @example DELETE http://localhost:3001/ordenes/1
 */
orderRouter.delete("/ordenes/:id", deleteOrder);

export default orderRouter;