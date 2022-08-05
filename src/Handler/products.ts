import express, { Request, Response } from 'express'
import { Products, product_info } from '../Models/products'
import { auth_token } from '../Middelware/auth_token'

export const products_app = express.Router()
const products_class = new Products

products_app.post('/add', auth_token, async (req: Request, res: Response) => {

    try {
        const product: product_info = {
            name: req.body.name,
            price: req.body.price
        }

        const result = await products_class.create(product)
        res.send(`one product has been added to item ${result.name}`)
    } catch (err) {
        throw new Error('please signin to create a product')
    }


})

products_app.get('/', async (req: Request, res: Response) => {
    try {
        //get all data from Products table
        const reslut = await products_class.show_all();
        res.json(reslut)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})

products_app.get('/one/:id', async (req: Request, res: Response) => {
    try {
        const input = req.params.id
        //get specific product by id from Product table
        const result = await products_class.show_one(input)
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }
})
