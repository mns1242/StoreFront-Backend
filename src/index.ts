import express, { Application, Request, Response } from 'express'
import bodyParser from 'body-parser'
import cors from "cors"
import { apps } from './Handler/users'
import * as dotenv from 'dotenv'


//Routers
import { products_app } from './Handler/products'
import { order_app } from './Handler/orders'
import {order_product_app} from './Handler/order_products'


dotenv.config()
const corsOptions = {
  origin:'http//someotherdomin.com',
  optionSuccessStatus:200
}

const PORT = process.env.PORT || 3000
// create an instance server
const app: Application = express()
// HTTP request logger middleware

app.use(cors(corsOptions))
app.use(bodyParser.json())

// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({
    message: 'Hello World 🌍'
  })
})

// users EndPoint
app.use('/user',apps)

//products EndPoint
app.use('/product',products_app)

//orders EndPoint
app.use('/order',order_app)


//order_product EndPoint 
app.use('/order-product',order_product_app)

// start express server
app.listen(PORT, () => {
  console.log(`Server is starting at prot:${PORT}`)
})

export default app