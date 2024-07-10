// const Razorpay = require("razorpay");
// const dotenv = require("dotenv");
// dotenv.config();

// exports.instance = new Razorpay({
//     key_id:process.env.RAZORPAY_KEY,
//     key_secret:process.env.RAZORPAY_SECRET,     
// })

const Razorpay = require('razorpay');
exports.instance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY,
    key_secret: process.env.RAZORPAY_SECRET,
});


// const Razorpay = require('razorpay');

// var instance = new Razorpay({
//   key_id: 'YOUR_KEY_ID',
//   key_secret: 'YOUR_KEY_SECRET',
// });