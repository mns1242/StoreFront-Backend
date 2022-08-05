import bcrypt from 'bcrypt'
import Client from "../database";
import dotenv, { config } from 'dotenv'

dotenv.config()

const{bcrypt_password,salt_round}=process.env

export type userinfo = {
    id?:number,
    firstName:string,
    LastName:string,
    password:string

}
export class userCRUD{

    async showAll():Promise<userinfo[]>{
        const conn =await Client.connect()
        const sql = "select * from users;"
        const result = await conn.query(sql)
        conn.release()
        return result.rows
    }

    async show_One(id:number):Promise<userinfo>{
        const conn = await Client.connect()
        const sql = "select * from users where id=($1);"
        const result = await conn.query(sql,[id])
        conn.release()
        return result.rows[0].id
    }

    //Adding new user

    async add_user(data:userinfo):Promise<userinfo>{
        try{

        const conn = await Client.connect();
        const sql = 'insert into users(firstName,LastName,Password)VALUES($1,$2,$3) RETURNING *;'

        //hashing the password
        const hash=bcrypt.hashSync(
            data.password+bcrypt_password,
            parseInt(salt_round as string) 
        )
        //end

        const result = await conn.query(sql,[data.firstName,data.LastName,hash])
        conn.release()
        console.log(`one user has been add ${data.firstName}`)
        return result.rows[0]
        
        }catch(err){
            throw new Error(`unable to create (${data.firstName}): ${err}`)
        }

    }

   
}