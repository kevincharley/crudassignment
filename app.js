var express = require('express');
var path = require('path');
var body = require('body-parser');
var mongo = require('mongoose');
var app = express();
var url = "mongodb://localhost/sdb"

mongo.connect(url,{useNewUrlParser:true}, (err)=>{
  if(err) throw err;
  else console.log("Database connected");
})

var product = require('./model/products');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(body.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(8080,()=>{
  console.log("Listening");
})

app.get("/", (req,res)=>{
  res.render("index");
})

app.post("/add",(req,res)=>{
  var p1 = new product();
  p1.productId = "P001";
  p1.productName = "Printer";
  p1.productPrice = 6000;
  p1.save((err)=>{
    if (err) throw err;
    else res.send("Data Added");
  })
})

app.get("/edit/:pid",(req,res)=>{
  product.updateOne(
    {productId:req.params.pid},
    {$set:
      {productName:"Scanner", productPrice:3000}
    },
    (err,result)=>{
      if (err) throw err;
      else res.send("Data Edited");
    }
  )
})

app.get("/view",(req,res)=>{
  product.find({},(err,result)=>{
    if (err) throw err;
    else res.send(result);
  })
})

app.get("/delete/:pid",(req,res)=>{
  product.deleteOne(
    {productId:req.params.pid},
    (err,result)=>{
      if (err) throw err;
      else res.send("Data Deleted");
    }
  )
})