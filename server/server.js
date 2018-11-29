let express = require("express");
let graphqlHTTP = require("express-graphql");
let { buildSchema } = require("graphql");
let cors = require("cors");
let Pusher = require("pusher");
let bodyParser = require("body-parser");
const AbonamenteRoutes = require('./routes/abonamente');
const UserRoutes = require("./routes/users");
const BauturaRoutes = require("./routes/bautura");
const VenueRoutes = require("./routes/venue");
const Abonament_UserRoutes = require("./routes/abonament_user");

// let Multipart = require("connect-multiparty");

// // Construct a schema, using GraphQL schema language
// // let schema = buildSchema(`
// //   type User {
// //     id : String!
// //     nickname : String!
// //     avatar : String!
//   }

//   type Post {
//       id: String!
//       user: User!
//       caption : String!
//       image : String!
//   }

//   type Query{
//     user(id: String) : User!
//     post(user_id: String, post_id: String) : Post!
//     posts(user_id: String) : [Post]
//   }
// `);

// // Maps id to User object
// let userslist = {
//   a:{
//     id: "a",
//     nickname: "Coffee shop",
//     avatar: "http://orchestrateinc.com/cms/wp-content/uploads/2017/05/coffee-icon.png"
//   },
//   b: {
//     id: "b",
//     nickname: "Restaurant",
//     avatar: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAflBMVEX///8AAADo6OhWVlbt7e1kZGTl5eWJiYn4+Pj7+/u8vLympqZdXV0kJCS/v7/r6+uampppaWmQkJDU1NSysrJKSkpzc3M+Pj5ubm7GxsbLy8t6enoqKiqCgoIvLy85OTlERETZ2dkLCwurq6sVFRUeHh6Xl5cRERFPT0+Ojo7BmR7IAAAF9klEQVR4nO3d6XaqMBgFULGIoC1FwQFna6v1/V/wohDrkAluQiKe8y+r9TMbEFQS02pVzHY/jK+aQRqF/lUzjhL36s9uEs2u/ixI4LtxmITxpy//GNVpz50sXdKBYDbJmpsL2Z9mzVUvIM3k9N8dT662F04PTpG3vueKH6Eh3uD8/Idd0Q5X5/agXbSH5+ZPWDSjvLvLgFLqofRu4lzna1li56tLWjz9uNjA3bz5Q3bie94u9rFP+izuahC+O/dZHCV3vsqkX/mTjwrSsejMLG+6v7fCTfFn4QHnR4sHYJb3WPRA5SHCdfHUxT500rzpjW6FRdMR7Qv3+E0DOs5kps9CDxEu8mcO7oTbDX0fbvlV/T3dl+X7UyeHEiL8KCcUHGwJE5gdLTWfbojwOyddhMXJM57cCF0i5B9rWw7QceZaQQ8h59IDXThb04Upt+jI4WXFf7DqEKFzJ+zlf2YJQ1a9U3jH6CnjWi/9F2He52B5K0wrCP3bC/1jFtztozoVhT1Oyd7BEWRY58lGICzexD0IE07JpSPKSHCxURqWsCBUET6+W3tIneeaO6EvKdyx6mUlfsXCOl+ILGFBqCBs868V19uvlgj2YY8h7LMrbkWn0tPDZT59KYpIuLgRfpLec4TkEspLZEKYnzwFwraEkBzYvOxrvFywhLt8KyflhT3qB8Pb1HlBZAn7lYXJh1h4fGrh7kcs7NovjNgVZYTLGt97h6WEnoSwz/j+4rWEc4PC+X8LI+FHC6NC9174UV74BWG9n/LLCbfkHRlHuG+GcMiuKCOcPrVwKAY6A4PCMYQQQvgiwk6NN6DuhJ9TCBsujCWER0cci4XkWyYI7RW2BxAqEb632Y9XnXLCGYQtCI0LvY6ccM+u2BAh51sMCO0WpuS+0ksLu444EKrMRZjf5fbIUJHi9tlFmINTidehtcJoG2fpkaEi3VMr3g6LW2Xj2bnZJ3c/n1G4Hp2yITf/VufmaE0G2N42n1JYLhC+vPANQvNCzlgMCCGEEEJFQs4IWgghtETIGahtmzAVd+c1hZw5M9YJJcb3UMKZEmKbcCYx3pUSzvxD64QS484p4cwhtU0YS8z/oIQz09k24fatkpAzEt024edY3J/nFrbY88o5GXFm9VgnTKpcLnhzz6wTehVeiBNeB60TSo3LvgtvFrCFQldiVutt+CPt7RP+3faUzC9/nrKFwpKfoNaCaco2CqWmDJKsRD+/YqWwFUu/FjfCqfR2CltuJAeUmPxpqfD0ozlrwaSz7/VRZni2tcIss2j8xpri+juNJH/iyWZhlnaH0Sf54ZKWCz2WUH76AIQQag6EEoEQQs2BUCIQQqg5EEoEQgg1B0KJQAih5kAoEQgh1BwIJQIhhJoDoUQghFBzIJQIhBBqDoQSgRBCzYFQIhBCqDkQSqT5wv3iLx+MVQSeW+h6l7RnjOkqzy28Dmu4anOErHIQagyEispBqDEQKioHocZAqKgchBoDoaJyEGoMhIrKQagxECoqB6HGQKioHIQaA6GichBqTPOFl9WQIJQLhAYCYclAaCAQlszrCutcZ+YuEJYMhAbSfOFlxWMI5QKhgUBYMhAaCIQlY6HQZS2VACE9ryvsyP9or+pAWDIQGgiEJWOjcA5hqbCEg2rlVKT5Qr/5wmUtwimE+lKTcAyhvkBYMiwhf9UvrQkYwq/mCBlzzRULl/YJD40XfqsVdsULY2nLkd6ln+YIh/QuLdQKJRY30xaGcKVWuDcoZCwtu1YrjAwKGWvojdQK+5zVdnWHIXyrttFZQt5qu7rTp68sO60mbDNu9HAXo9WccE3tUtWTX58uDNV2ulQYa+dW7VI8olX7EK1lqjXUS/6Es1o8P9Srj8E33lm8CaVLu+rlKL8ytDB5kLaoL533yruw1Up+HsrtDV4rznn4iDj5r5fNwxYz+MGiyP13pqJFnEXp365RuzcOPC0OfH1kdSTXkGUnvbruj3oG37D9JYiX5MI/6SnY5G46Pm+zw6Bn7gb+XQI/jubzbuIp2uKB73ue7//fKeYf6FSXYSXlVIkAAAAASUVORK5CYII="
//        }
// };

// let postslist = {
//   a: {
//     a: {
//       id: "a",
//       user: userslist["a"],
//       caption: "Target 1!",
//       image: "https://banner2.kisspng.com/20180320/pte/kisspng-coffee-cup-tea-cafe-breakfast-tea-cup-icon-5ab0e89ae68d48.3792633615215433229444.jpg"
//     },
//     b: {
//       id: "b",
//       user: userslist["b"],
//       caption: "Target 2!",
//       image:
//         "https://cdn2.iconfinder.com/data/icons/food-restaurant-1/128/flat-15-512.png"
//     },
//     c: {
//       id: "c",
//       user: userslist["b"],
//       caption: "Target 3!",
//       image: "https://cdn2.iconfinder.com/data/icons/food-restaurant-1/128/flat-15-512.png"
//     },
//     d: {
//       id: "d",
//       user: userslist["a"],
//       caption: "Target 4!",
//       image: "https://banner2.kisspng.com/20180320/pte/kisspng-coffee-cup-tea-cafe-breakfast-tea-cup-icon-5ab0e89ae68d48.3792633615215433229444.jpg"
//     }
//   }
// };

// console.log(postslist);
// // The root provides a resolver function for each API endpoint
// let root = {
//   user: function({ id }) {
//     return userslist[id];
//   },
//   post: function({ user_id, post_id }) {
//     return postslist[user_id][post_id];
//     console.log(postslist[user_id][post_id]);
    
//   },

  
//   posts: function({ user_id }) {
//     return Object.values(postslist[user_id]);
//     console.log(postslist[user_id]);
//   }
  
// };

// Configure Pusher client
// let pusher = new Pusher({
//   appId: "PUSHER_APP_ID",
//   key: "PUSHER_APP_KEY",
//   secret: "PUSHER_APP_SECRET",
//   cluster: "PUSHER_APP_CLUSTER",
//   encrypted: true
// });

// create express app

//Connect to Mongoose
let mongoose = require("mongoose"); 
mongoose.connect('mongodb://localhost/test');

//Test MongoDB Connection
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.on('connected', function () {
  console.log('MongoDB Connection Successful!');
});

let app = express();
app.use(bodyParser.json());


app.use('/abonamente', AbonamenteRoutes);
app.use("/users", UserRoutes);
app.use("/bautura", BauturaRoutes);
app.use("/venue", VenueRoutes);
app.use("/abonament_user", Abonament_UserRoutes);

app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

//custom error handling for unknown routes
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});



app.listen(4000);
console.log("Running a GraphQL API server at localhost:4000/graphql");
