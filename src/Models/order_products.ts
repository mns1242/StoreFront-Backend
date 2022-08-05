import Client from "../database";


export type order_product_info = {

    quantity:number,
    order_id:string,
    product_id:string
}

export class order_product{


    async add_order_product(data:order_product_info):Promise<order_product_info>{

        const conn = await Client.connect()
        const sql = 'INSERT INTO order_products(quantity,order_id,product_id)VALUES($1,$2,$3) RETURNING *;'
        const result = await conn.query(sql,[data.quantity,data.order_id,data.product_id])
        conn.release()

        return result.rows[0]
    }

   
}