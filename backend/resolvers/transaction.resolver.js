import { transactions } from "../dummydata/data";
import Transaction from "../model/transaction.model";

const transactionResolver ={
    Query:{
        transactions : async (_,_,context)=>{
            try {

                if(!context.getUser()){
                    console.log("transaction error")
                    throw new Error(error.message || "INternal server error in transacvtions of transaction.resolver")
                }
                const userId=context.getUser()._id;
                const transaction=await Transaction.find({userId:userId});

                return transaction;
                
            } catch (error) {
                console.log("transaction error")
                throw new Error(error.message || "INternal server error in transacvtions of transaction.resolver")
            }
        },
        transaction:async (_,{transactionId})=>{
                    try {
                        return await Transaction.findById(transactionId);
                        
                    } catch (error) {
                        console.log("transaction error resolver transaction.resolver")
                            throw new Error(error.message || "INternal server error in transaction not found")
                    }
                    
            },
    },
    Mutation :{
        createTrans:async (_,{input},context)=>{

            try {
                const {description,paymentType,category,amount,location,date}=input;
                if(!description || !paymentType || !category || !amount || !date){
                    throw new Error("All fields are required")
                }

                const existtrans=Transaction.findOne(description);

                if(existtrans){
                    throw new Error("User already exists")
                }
                const newTransaction = new Transaction({
                    userId:context.getUser()._id,
                    description,
                    paymentType,
                    category,
                    amount,
                    location,
                    date,
                });

                await newTransaction.save();
                
            } catch (error) {
                console.log("createtransa error")
                throw new Error(error.message || "INternal server error in creattrans")
            }
            
        },
        updateTrans:async (_,{input},context)=>{
            try {
                const updatetrans=await Transaction.findByIdAndUpdate(input.transactionId,input,{new:true});
                return updatetrans;
                
            } catch (error) {
                console.log("updatetrans error")
                throw new Error(error.message || "INternal server error in updatetrans")
            }
        },

        deleteTrans:async (_,{transactionId},context)=>{
            try {
                return await Transaction.findByIdAndDelete(transactionId);   
            } catch (error) {
                console.log("deletetrans error")
                throw new Error(error.message || "INternal server error in deletetrans")
            }
        },

    }
};

export default transactionResolver;