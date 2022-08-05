import express, { Request, Response } from "express";
import { order_product_info, order_product } from "../Models/order_products";
import { auth_token } from "../Middelware/auth_token";

export const order_product_app = express.Router()

const class_order_products = new order_product

order_product_app.post('/order/:id/products', auth_token, async (req: Request, res: Response) => {
    try {
        const data: order_product_info = {
            quantity: parseInt(req.body.quantity),
            order_id: req.params.id,
            product_id: req.body.product_id
        }
        const result = await class_order_products.add_order_product(data)
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)

    }

})


