import Client from '../database'


export type product_info = {
    name: string,
    price: Number
}

export class Products {
    //add a new product
    async create(data: product_info): Promise<product_info> {

        const conn = await Client.connect();
        const sql = 'INSERT INTO products(name,price)VALUES($1,$2) RETURNING *;'
        const result = await conn.query(sql, [data.name, data.price])
        conn.release()
        return result.rows[0]
    }
    async show_all(): Promise<product_info[]> {
        try {
            const conn = await Client.connect()
            const sql = 'SELECT * FROM products;'
            const result = await conn.query(sql)
            conn.release()
            return result.rows
        } catch (err) {
            throw new Error(`Error occurred try again`)
        }
    }
    async show_one(id:string):Promise<product_info>{
        const conn = await Client.connect();
        const sql = 'SELECT * FROM products WHERE id =($1);'
        const result = await conn.query(sql,[id])
        conn.release()

        return result.rows[0]
    }

}