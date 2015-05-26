var express = require('express');
var app = express();
var mongojs = require("mongojs");
var database = mongojs("productList",['productList']);
var bodyParser = require("body-parser");

app.use(express.static(__dirname + "/public"));
app.use(bodyParser.json());

app.get('/products',function(req,res){
	console.log('First Request');	
	database.productList.find(function(err,docs){
		res.send(docs);
	})
	
});
app.put('/products/:id',function(req,res){
	var id = req.params.id;
	console.log("Request by put - " + id) ;
	  database.productList.update({ _id : mongojs.ObjectId(id)},
		{
		 id  :req.body.id ,
		 name: req.body.name ,
		 qty :req.body.qty ,
		 CP  :req.body.CP ,
		 SP  : req.body.SP
		},function(error,doc){
			res.json(doc);
		}
	  );
});


app.get("/products/:name",function(req,res){
	var productName = req.params.name;
	console.log("Request by get - " + productName) ;
	database.productList.find({name: productName},function(err,docs){
		res.json(docs);
	})
})

app.post("/products",function(req,res){
	console.log("Request by post ") ;
	database.productList.insert(req.body,function(error,docs){
		res.json(docs);

	} );

})

app.listen(4000);
console.log("Server Running on port 4000");