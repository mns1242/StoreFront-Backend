import express, { Request, Response } from 'express'
import { order, order_info } from '../Models/orders'
import { auth_token } from '../Middelware/auth_token'
export const order_app = express.Router()
const order_class = new order


order_app.post('/add',auth_token, async (req: Request, res: Response) => {
    try {
        const data: order_info = {
            status: req.body.status,
            user_id: req.body.user_id
        }
        const result = await order_class.create_order(data)
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }

})



order_app.get('/one/:id', auth_token, async (req: Request, res: Response) => {
    try {


        const id = req.params.id
        const result = await order_class.show_user_order(id)
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }


})

order_app.get('/', auth_token, async (req: Request, res: Response) => {

    try {
        const result = await order_class.show_all()
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }


})