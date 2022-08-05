import express, { Request, Response } from 'express'
import { userinfo, userCRUD } from '../Models/users'
import jwt from 'jsonwebtoken'
import dotenv from "dotenv"
import { auth_token } from '../Middelware/auth_token'
export const apps = express.Router()
const userClass = new userCRUD;
dotenv.config()

const { token_key } = process.env


apps.post('/add', async (req: Request, res: Response) => {
    try {
        const user: userinfo = {
            firstName: req.body.firstName,
            LastName: req.body.LastName,
            password: req.body.Password
        }
        //Create Token for the user 
        const result = userClass.add_user(user)
        var token = jwt.sign({ user: result }, token_key as unknown as string)
        res.json({ token })
        console.log(`Token: ${token}`)
    } catch (err) {
        res.status(400)
        res.json(err)
    }

})

apps.get('/', auth_token, async (req: Request, res: Response) => {

    try {
        const result = await userClass.showAll()
        res.json(result)
    } catch (err) {
        res.status(400)
        res.json(err)
    }

})

apps.get('/one/:id', auth_token, async (req: Request, res: Response) => {
    try {

        const input = parseInt(req.params.id)
        const result = await userClass.show_One(input);

        //check the input if it's exist 
        if (result) {
            res.json(result)
        } else {
            res.send(` No user with this ID: ${input}`)
        }
    } catch (err) {
        res.status(400)
        res.json(err)
    }

})

