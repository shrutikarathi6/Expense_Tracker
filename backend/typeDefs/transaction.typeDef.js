const transactionTypeDef = `#graphql
    type Transaction{
        _id:ID!
        userId:ID!
        description:String!
        paymentType:String!
        category:String!
        amount:Float!
        location:String
        date:String!
    }

    type Query{
        transactions : [Transaction!]!
        transaction(transactionId:ID!):Transaction
    }

    type Mutation{
        createTrans(input:createTransInput):Transaction!
        updateTrans(input:updateTransInput):Transaction!
        deleteTrans(transactionId:ID!):Transaction!
    }

    input createTransInput{
        description:String!
        paymentType:String!
        category:String!
        amount:Float!
        location:String
        date:String!
    }

    input updateTransInput{
        transactionId:ID!
        description:String
        paymentType:String
        category:String
        amount:Float
        location:String
        date:String
    }

`

export default transactionTypeDef;