import { Products, product_info } from "../../Models/products";
import app from "../../index"
import supertest from "supertest";
import jwt from "jsonwebtoken";

const request = supertest(app)
const product = new Products()
const { token_key } = process.env

const Product_info: product_info = {
    name: "iphone x",
    price: 4000
}

const token = jwt.sign(Product_info, token_key as unknown as string);


describe("Products Models test", () => {

    it("Should show All Product", () => {
        expect(product.show_all).toBeDefined()
    })

    it("Should show a specific product", () => {
        expect(product.show_one).toBeDefined()
    })

    it("Should show add product method", () => {
        expect(product.create).toBeDefined()
    })

})

describe("Endpoint Testing", () => {


    it('Get /product Retrive all Products with providing a token', async () => {
        const response = await request
            .get('/product/')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
    });

    it("Get /product/one/:id Retrive a product with providing a token", async () => {
        const response = await request
        .get('/product/one/1')
        .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200)

    })

    it("Post /product/add Create a product",async()=>{
        const response = await request
        
        .post('/product/add')
        .set('Authorization',`Bearer ${token}`).send(Product_info)
        expect(response.status).toBe(200)
    })

    describe('test product model methods', () => {

        it('fetch all products', async function () {
            const productinfo: product_info = {
                name: "Legion Laptop",
                price: 800,
            }
            await product.create(productinfo)
            const products = await product.show_all()
    
          expect(products.length).toBeGreaterThan(0);
        });

        
        it('fetch one product', async function () {
            const products = await product.show_one('1')
            expect(products.price).toEqual(4000);
        });
        it('Create one product', async function () {
            const productinfo: product_info = {
                name: "Legion Laptop",
                price: 800,
            }
            const products = await product.create(productinfo)
            expect(products.price).toEqual(productinfo.price);
        });
    });


})
