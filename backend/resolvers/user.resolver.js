import { users } from "../dummydata/data.js ";
import User from "../model/user.model";
import bcrypt from "bcryptjs"

const userResolver = {

    Mutation:{
        signUp: async (_,{input},context)=>{
            try {
                const { username,name,password,gender} = input;
                if(!username || !name || !password || !gender){
                    throw new Error("All fields are required")
                }
                const existuser = User.findOne({username});

                if(existuser){
                    throw new Error("User already exists")
                }
                
                
                const hashpass = await bcrypt.hash(password,10);

                const boyProfile = `https://avatar.iran.liara.run/public/boy?username=${username}`;
                const girlProfile = `https://avatar.iran.liara.run/public/girl?username=${username}`;

                const newUser = new User({
                    username,
                    name,
                    password:hashpass,
                    gender,
                    profilePicture:gender==="male"?boyProfile:girlProfile,
                });

                await newUser.save();
                await context.login(newUser)

                return newUser;


            } catch (error) {
                console.log("Signup error")
                throw new Error(error.message || "INternal server error in signup")
            }
        },
        login: async (_,{input},context)=>{
            try {
                const { username,password} = input;
                const {user} = await context.authenticate ("graphql-local",{username,password});

                await context.login(user);

                return user;


            } catch (error) {
                console.log("SignIn error")
                throw new Error(error.message || "INternal server error in signin")
            }
        },
        logout : async (_,_,{}) =>{
            try {
                await context.logout();
                req.session.destroy((err)=>{
                    if(err){
                        throw new Error (err.message)
                    }

                })

                req.clearCookie("connect.sid")

                return {message :"Logout successfully"}
                
            } catch (error) {
                console.log("logout error")
                throw new Error(error.message || "INternal server error in logout")
            }

        }



    },

    Query:{
       authUser : async (_,_,context)=>{
        try {

            const user =await context.getUser();
            return user;
            
        } catch (error) {
            console.log("autherror error")
                throw new Error(error.message || "INternal server error in authuser")
        }
       },
        user:async (_,{userId})=>{
            try {
                return await User.findById(userId);
                
            } catch (error) {
                console.log("===user error resolver user.resolver")
                    throw new Error(error.message || "INternal server error in user not found")
            }
            
        },
    },

   
}

export default userResolver;