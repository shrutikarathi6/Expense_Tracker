import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../model/user.model.js"
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurepassport = async ()=>{
    passport.serializeUser((user,done)=>{
        done(null,user._id)
    });

    passport.deserializeUser(async(id,done)=>{
        try{
            const user = await User.findById(id);
            done(null,user)
        }
        catch(error){
            done(error)
        }
    })

    passport.use(
        new GraphQLLocalStrategy(async (username,password,done)=>{
            try {

                const user = await User.findOne({username});
                if(!user){
                    throw new Error("Invalid username or password")
                }

                const comparepass = await bcrypt.compare(password,user.password);
                if(!comparepass){
                    throw new Error("Invalid password")
                }

                return done(null,user);
                
            } catch (error) {
                
            }
        })
    )
}
