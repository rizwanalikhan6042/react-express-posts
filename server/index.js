// const express = require("express");
// const cors = require("cors");
// require('./config');
// const userfileRef = require('./users');
// const Post = require('./postModal');
// const Jwt = require('jsonwebtoken');
// const jwtKey = 'e-comm';
// const app = express();
// app.use(cors());
// app.use(express.json());

// // app.use(express.urlencoded());
// app.post('/register/', async (req, resp) => {
//   // Creating a new user instance with the data from the request body
//   let userRef = new userfileRef(req.body);
//   // Saving the new user to the database
//   let result = await userRef.save();
//   // For the sign up registration API, removing the password in response
//   result = result.toObject();
//   delete result.password;
//   Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
//       if (err) {
//           resp.send({ result: "Something went wrong,Please try again after sometime!" });
//       }
//       resp.send({ result, auth: token });
//   })

//   console.log(result);
//   // Sending the result back as the response

// })

// app.post('/login', async (req, resp) => {
//   // Check if both email and password are provided in the request body
//   if (req.body.email && req.body.password) {
//       // Find the user in the database based on the provided email and password
//       let user = await userfileRef.findOne(req.body).select("-password");
//       // We should not include the password in the response to enhance security so select() used
//       // Respond with the request body, which typically contains user credentials

//       if (user) {
//           // Generate a JWT token for the user's authentication                                     // If the user is found in the database
//           Jwt.sign({ user }, jwtKey, { expiresIn: '2h' }, (err, token) => {
//               if (err) {                           // If there's an error while generating the token
//                   resp.send({ result: "something went wrong,Please try again" })
//               }
//               resp.send({ user, auth: token });  // Respond with the user object (excluding the password) and the JWT token
//           })

//       }
//       // If the user is not found in the database
//       else {
//           resp.send({ result: "User not found" }); // Respond with a message indicating that the user was not found
//       }

//   } else {
//       // If either email or password is missing in the request body
//       // Respond with a message indicating that both email and password are required
//       resp.send({ result: "Provide both email and password" });
//   }
// })
// // const Jwt = require('jsonwebtoken');

// app.get('/posts', async (req, res) => {
//   try {
//     const page = parseInt(req.query.page) || 1;
//     const limit = parseInt(req.query.limit) || 10;
//     const skip = (page - 1) * limit;

//     // Fetch posts from the database with pagination
//     const posts = await Post.find().skip(skip).limit(limit);

//     // Respond with the fetched posts
//     res.json(posts);
//   } catch (error) {
//     // If an error occurs, respond with an error message
//     console.error("Error fetching posts:", error);
//     res.status(500).json({ error: "An error occurred while fetching posts" });
//   }
// });

// function verifyToken(req, resp, next) {
//   let token = req.headers['authorization'];

//   if (token) {
//       token = token.split(' ')[1];
//       console.log("middleware called", token);
//       Jwt.verify(token, jwtKey, (err, valid) => {
//           if (err) {
//               resp.status(401).send({ result: "Please provide valid token" });
//           } else {
//               next();
//           }
//       })

//   } else {
//       resp.status(403).send({ result: "Please add token with header" });
//   }

// }

// app.listen(3201,()=>{
//        console.log("port connected");
//    })
// const express = require("express")
// const collection = require("./users")
// const cors = require("cors")
// const app = express()
// app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cors())



// app.get("/",cors(),(req,res)=>{

// })


// app.post("/",async(req,res)=>{
//     const{email,password}=req.body

//     try{
//         const check=await collection.findOne({email:email})

//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("notexist")
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })



// app.post("/signup",async(req,res)=>{
//     const{email,password}=req.body

//     const data={
//         email:email,
//         password:password
//     }

//     try{
//         const check=await collection.findOne({email:email})

//         if(check){
//             res.json("exist")
//         }
//         else{
//             res.json("notexist")
//             await collection.insertMany([data])
//         }

//     }
//     catch(e){
//         res.json("fail")
//     }

// })

// app.listen(3201,()=>{
//     console.log("port connected");
// })
const express = require('express');
const cors = require('cors');
require('./config');

const userfileRef = require('./users');
const Post = require('./postModal');

const Jwt = require('jsonwebtoken');
const { LEGAL_TCP_SOCKET_OPTIONS } = require('mongodb');
const jwtKey = 'e-comm1';

const app = express();
app.use(cors());
app.use(express.json());
// In the post route, I am adding comments to understand properly the working of route
// Handling POST requests to the '/register' endpoint for registration signup
app.post('/register', async (req, resp) => {
  console.log(req.body);
  // Creating a new user instance with the data from the request body
  let userRef = new userfileRef(req.body);
  // Saving the new user to the database
  let result = await userRef.save();
  // For the sign up registration API, removing the password in response
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: '2h' }, (err, token) => {
    if (err) {
      resp.send({ result: "Something went wrong,Please try again after sometime!" });
    }
    resp.send({ result, auth: token });
  })

  console.log(result);
  // Sending the result back as the response

})
app.get('/posts', verifyToken, async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Fetch posts from the database with pagination
    const posts = await Post.find().skip(skip).limit(limit);

    // Respond with the fetched posts
    res.json(posts);
  } catch (error) {
    // If an error occurs, respond with an error message
    console.error("Error fetching posts:", error);
    res.status(500).json({ error: "An error occurred while fetching posts" });
  }
});
function verifyToken(req, resp, next) {
  
  
  let token = req.headers['authorization'];

  if (token) {
    token = token.split(' ')[1];
    console.log("middleware called", token);
    Jwt.verify(token, jwtKey, (err, valid) => {
      if (err) {
        resp.status(401).send({ result: "Please provide valid token" });
      } else {
        next();
      }
    })

  } else {
    resp.status(403).send({ result: "Please add token with header" });
  }

}
app.listen(3200, () => {
  console.log("port connected")
});

