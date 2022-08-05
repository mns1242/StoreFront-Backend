import {userCRUD,userinfo} from "../../Models/users"
import app from '../../index';
import supertest from 'supertest';
import jwt from 'jsonwebtoken'
const user = new userCRUD;
const request = supertest(app);

const { token_key } = process.env

const newUser:userinfo = {
    
    firstName: 'Mohammed',
    LastName: 'Nasser',
    password: 'A112d',
  };

const token = jwt.sign(newUser,token_key  as unknown as string);


describe("User model testing",()=>{
    it("should show all users",()=>{
        expect(user.showAll).toBeDefined();
    })

    it("Should have show_one method ",()=>{
        expect(user.show_One).toBeDefined();
    })

    it("Should have adduser method",()=>{
        expect(user.add_user).toBeDefined();
    })

})


  describe("Endpoint Testing",()=>{
    
    it('Get /user/one/:id Retrive a user  with providing a token', async () => {
        const response = await request
          .get('/user/one/1')
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      });

    it('Get /user/ Retrive all users with providing a token', async () => {
        const response = await request
          .get('/user/')
          .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(200);
      });

      it("Post /user/add Create a user",async()=>{
        const response = await request
        .post('/user/add')
        .set('Authorization',`Bearer ${token}`).send(newUser)
        expect(response.status).toBe
    })

}) 

describe('test user model methods', () => {

  it('fetch all User', async function () {
      const newUser: userinfo = {
        firstName: 'Mohammed',
        LastName: 'Nasser',
        password: 'A112d',
      }
      await user.add_user(newUser)
      const users = await user.showAll()
    expect(users.length).toBeGreaterThan(0);
  });

  it(`Show one user byId`, async () => {
  
    const result= await user.show_One(5)
    expect(result).toBeTruthy();
  });

  
  it(`Create one user`, async () => {
    const result= await user.add_user(newUser)
    expect(result).toBeTruthy();
  });

  
});
