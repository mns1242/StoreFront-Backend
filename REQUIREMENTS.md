# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products 
- Index => http://localhost:3000/product => Get
- Show => http://localhost:3000/product/one/:id => Get
- Create [token required] => http://localhost:3000/product/add  => Post 


#### Users 
- Index [token required] => http://localhost:3000/user => Get 
- Show [token required] => http://localhost:3000/user/one/:id => Get
- Create N[token required] => http://localhost:3000/user/add => Post

#### Orders
- Index [token required] => http://localhost:3000/order => Get 
- Show [token required] => http://localhost:3000/order/one/:id => Get 
- Create [token required] => http://localhost:3000/order/add => Post 
#### Order_Product 
- Create [token required] => http://localhost:3000/order-product/order/:id/products => Post 

## Data Shapes
#### Product 
CREATE TABLE products(
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    price INTEGER
)

#### User 
CREATE TABLE users (
    id SERIAL PRIMARY  KEY,
    firstName VARCHAR (255) NOT NULL,
    LastName VARCHAR (255) NOT NULL,
    Password VARCHAR(255) NOT NULL 
)

#### Orders 
CREATE TABLE orders (
    id SERIAL PRIMARY KEY,
    status VARCHAR(15),
    user_id bigint REFERENCES users(id)
)

#### Order_product
CREATE TABLE order_products (
    id SERIAL PRIMARY KEY,
    quantity integer,
    order_id bigint REFERENCES orders(id),
    product_id bigint REFERENCES products(id)
)
