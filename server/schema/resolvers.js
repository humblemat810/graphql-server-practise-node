const {UserList, MovieList} = require("../FakeData")
const _ = require("lodash")
const jq = require("jq-web")

const resolvers = {
    Query: {
        users: ()=> {
            if (UserList) return {users: UserList} ;

            return {message: "error here"};
        },
        user: (parent, args) => {
            const id = args.id;
            const user = _.find(UserList, {id:Number(id)});

            return user;
            
        },
        movies: () => {
            return MovieList;
        },
        movie: (parent, args) => {
            const name = args.name;
            const movie = _.find(MovieList, {name});

            return movie;
        },

    },
    User: {
        favouriteMovies: (parent) => {
            console.log(parent)
            return _.filter(
                MovieList, 
                (movie) => 
                    movie.yearOfPublication >= 2000 && movie.yearOfPublication <= 2010
            );
        },
    },
    UsersResult: {
        __resolveType(obj){
            if (obj.users) {
                return "UsersSuccessfulResult"
            }
            if (obj.message){
                return "UsersFailResult";
            }

            return null;
        }
    },
    Mutation: {
        createUser: (parent, args) => {
            const user = args.input;
            const lastId = UserList[UserList.length-1].id;
            user.id = lastId+1;
            UserList.push(user);
            return user;
            //return user
        },
        deleteUser: (parent, args) => {
            const id = args.input.id;
            let userDeleted;
            userDeleted = _.find(UserList, (user) => user.id === Number(id))
            _.remove(UserList, (user) => user.id === Number(id) );
            return userDeleted;
            
            //return user
        },
        updateUsername: (parent, args) => {
            const {id, newUsername} = args.input;
            let userUpdated;
            UserList.forEach((user) => {
                if (user.id===Number(id)) {
                    user.username = newUsername;
                    userUpdated = user
                }
            })
            return userUpdated
        },
    }
}

module.exports = {resolvers};