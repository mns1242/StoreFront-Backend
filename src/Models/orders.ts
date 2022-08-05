
import Client from "../database";

export type order_info ={

    status:string,
    user_id:number
} 
export class order{

    async create_order(data:order_info):Promise<order_info>{
        const conn =await Client.connect();
        const sql = 'insert into orders(status,user_id)values($1,$2) RETURNING * ;'
        const result =await conn.query(sql,[data.status,data.user_id])
        conn.release()
        return result.rows[0]
    }
    async show_user_order(id:string):Promise<order_info>{
        const conn =await Client.connect();
        
        const sql = 'select * from orders where id=($1);'
        const result =await conn.query(sql,[id])
        conn.release()
        return result.rows[0]
    }
    async show_all():Promise<order_info[]>{
        
        const conn =await Client.connect();
        const sql = 'select * from orders;'
        const result =await conn.query(sql)
        conn.release()
        return result.rows

    }
}