const { gql } = require("apollo-server")

const typeDefs = gql`
    type User{
        name: String!
        id: ID!
        username: String!
        age: Int!
        nationality: Nationality!
        friends: [User!]
        favouriteMovies:[Movie]
    }

    type Query {
        users: UsersResult
        user(id: ID!): User
        user2(name: String!): User
        movies: [Movie!]!
        movie(name: String!): Movie!
    }
    
    type Movie {
        id: ID!
        name: String!
        yearOfPublication: Int!
        isInTheaters: Boolean!
    }
    input CreateUserInput{
        name: String!
        username: String!
        age: Int!
        nationality: Nationality = BRAZIL
    }
    input UpdateUsernameInput {
        id: ID!
        newUsername: String!
    }
    input DeleteUserInput {
        id: ID!
    }
    type Mutation {
        createUser(input: CreateUserInput!): User
        updateUsername(input: UpdateUsernameInput!): User
        deleteUser(input: DeleteUserInput!): User
    }

    enum Nationality{
        CANADA
        BRAZIL
        GERMANY
        CHILE
        INDIA
        UKRAINE
    }
    type UsersSuccessfulResult{
        users: [User!]!
    }
    type UsersFailResult{
        message: String!
    }
    union UsersResult = UsersSuccessfulResult | UsersFailResult
`   
    

module.exports = {
    typeDefs
}