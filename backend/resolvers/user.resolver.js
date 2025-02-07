import { users } from "../dummydata/data.js ";

const userResolver = {
    Query:{
        users:(_,_,context)=>{
            return users;
        },
        user:(_,{userId})=>{
            return users.find((user)=>user._id===userId)
        }
    },

    Mutation:{}
}

export default userResolver;