const functions = require("firebase-functions");
const express = require("express");
const cors = require("cors");
// const { response } = require("express");
const stripe = require("stripe")('sk_test_51KzdcZBuWfpOWtPjhaWN0DiI03w95HJ9dDxMY7K6krr8cQnoBoWnkWvTuNqd3f1MiPqLpu1wt3rCjH0aVF2z8XWX00kFmzBWrF');

// App config
const app = express();

// Middlewares
// When origin is set to true, it means that any domain is allowed to make cross-origin requests. This is often used during development when the server and client are running on different domains.
app.use(cors({ origin: true }));
app.use(express.json());

// api routes
app.get('/', (request, response) => response.status(200).send('hello world'));
// another url
// app.get('/qazi', (request, response) => response.status(200).send('what up kazi'));
app.post('/payments/create', async (request, response) => {
 // query paramter - request params
 const total = request.query.total;
 console.log(`payment request received ${total}`);

 const paymentIntent = await stripe.paymentIntent.create({
  amount: total,
  currency: "usd",
 });

 // 201-- okay and created something
 // 200- okay
 response.status(201).send({
  clientSecret: paymentIntent.client_secret,
 })
})

// Listen
// runs on a cloud function
exports.api = functions.https.onRequest(app);

// to run on local - emulate it
// firebase emulators:start
// url is an api endpoint



