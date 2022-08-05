import { order,order_info } from "../../Models/orders";
import { order_product, order_product_info  } from "../../Models/order_products";
import app from "../../index";
import supertest from "supertest";
import jwt from "jsonwebtoken";

const request = supertest(app)
const Orders = new order()
const order_Product = new order_product()
const {token_key} = process.env

const Order_info:order_info ={
    status:"active",
    user_id:1
} 
const orderProduct={
quantity:1,
order_id:'1',
product_id:'1'
}

const token = jwt.sign(Order_info,token_key as unknown as string)
const tokenproduct = jwt.sign(orderProduct,token_key as unknown as string)

describe("Order Models test",()=>{

    it("Should show all Order",()=>{
        expect(Orders.show_all).toBeDefined()
    })

    it("Should show a specific order",()=>{
        expect(Orders.show_user_order).toBeDefined()
    })

    it("Should show add order method",()=>{
        expect(Orders.create_order).toBeDefined()
    })

})

describe("Endpoint Testing",()=>{

    it("Get /order Retrive all order with providing a token", async()=>{
        const response = await request
        .get('/order/')
        .set('Authorization',`Bearer ${token}`)
        expect(response.status).toBe(200)
    })

    it("Get /order/one/:id Retrive a specific order with providing a token", async()=>{
        const response = await request
        .get('/order/one/1')
        .set('Authorization',`Bearer ${token}`)
        expect(response.status).toBe(200)
    })

    it("Post /order/add Create an order with providing a token", async()=>{
        const response = await request
        .post('/order/add')
        .set('Authorization',`Bearer ${token}`).send(Order_info)
        expect(response.status).toBe(200)
    })
})

describe("Order Product Models test",()=>{

    it("Should show add order_product method",()=>{
        expect(order_Product.add_order_product).toBeDefined()
    })
})

describe('test order model methods', () => {

    it('fetch all orders', async function () {
        const Order_info:order_info ={
            status:"active",
            user_id:1
        } 
        await Orders.create_order(Order_info)
        const order = await Orders.show_all()

      expect(order.length).toBeGreaterThan(0);
    });

    it(`show user order byId`, async () => {
        const result= await Orders.show_user_order('1')
        expect(result).toBeTruthy();
      });
      it(`Create one order`, async () => {
        const result= await Orders.create_order(Order_info)
        expect(result).toBeTruthy();
      });

});
