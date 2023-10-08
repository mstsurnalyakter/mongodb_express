const express = require('express');
const mongoose = require("mongoose");

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

// create product schema
const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now
    }
})

//create product model
const Product = mongoose.model("Products", productSchema);

// mongoose
//   .connect("mongodb://127.0.0.1:27017/test")
//   .then(() => console.log("Connected!"))
//   .catch((err)=>{
//     console.log(`db's not connected!`);
//     console.log(err);;
//     process.exit(1)
//   })

const connectDB = async () =>{
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/testProductDB");
        console.log(`db's connected!`);
    } catch (error) {
        console.log(`db's not connected!`);
        console.log(error.message);
        process.exit(1);
    }
}

app.get("/",(req, res)=>{
    res.send(`<h1>Hello world</h1>`)
})

// app.post("/products",async (req, res)=>{
//     try {
//         //get data from request body
//         const {title, price, description} = req.body;

//         const newProduct = new Product({
//             title,
//             price,
//             description
//         })
//        const productData = await newProduct.save();

//         res.status(201).send(productData)
//     } catch (error) {
//         res.status(500).send({message:error.message})
//     }
// })

app.post("/products",async (req, res)=>{
    try {

       const productData = await Product.insertMany([
        {
            "title":"iphone 5",
            "price":255,
            "description":"beautiful phone"
        },
        {
            "title":"iphone",
            "price":"4",
            "description":"nice phone"
        }
       ]);

        res.status(201).send(productData)
    } catch (error) {
        res.status(500).send({message:error.message})
    }
})


module.exports = {
    app,
    connectDB
};


/**
 * {
 * id
 * title
 * price
 * description
 * date
 * }
 * products
 */

/**
 * database -> collections -> document
 */
