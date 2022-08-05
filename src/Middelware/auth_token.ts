import {Request,Response,NextFunction} from "express";

import dotenv from "dotenv"
import jwt from "jsonwebtoken"

dotenv.config()

const {token_key} = process.env


const handelerror =(next:NextFunction)=>{
    const error:Error = new Error("Login Error: Please try again")
    next(error)
}
// auth_token to Verifying JWT of the user befor get the response
export const auth_token = (req:Request,res:Response,next:NextFunction)=>{
    try{ 
    

        //go to postman 
        //insert the token in the authorization
        const authorizationHeader:any = req.headers.authorization
        const token = authorizationHeader.split(' ')[1]
        if(jwt.verify(token,token_key as unknown as string  )){
            next()
        }else{
            handelerror(next)
        }
        
       

      
        }catch(err){
    
        handelerror(next)
        

    }
    

}