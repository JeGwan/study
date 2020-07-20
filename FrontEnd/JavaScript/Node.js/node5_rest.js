const express = require('express');
const app = express();
const fs = require('fs');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(function(req,res,next){
	console.log(req.method,req.url,req.body);
	res.header("Content-Type", "text/plain; charset=utf-8");
	next();
});
app.get('/', function (req, res) {
	res.send('Hello World!');
});
// RESTful
app.get('/users/:id',function(req,res){
	// CRUD : Read
	fs.readFile('./node5_users.json','utf8',function(err, data){
		const userData = JSON.parse(data);
		if(userData[req.params.id]){
			res.send(userData[req.params.id].name);
		}else{
			res.send("nope");
		}
	});
});
app.post('/users',function(req,res){
	// CRUD : create
	if(!req.body.id || !req.body.name || !req.body.password){
		res.send("need id, name, password");
	}else{
		fs.readFile("./node5_users.json","utf8",function(err,data){
			var users = JSON.parse(data);
			if(users[req.body.id]){
				res.send("aleady has");
			}else{
				users[req.body.id] = {
					password : req.body.password,
					name : req.body.name
				};
				fs.writeFile("./node5_users.json",JSON.stringify(users,null,"\t"),"utf8",function(err){
					if(err) res.send("cannot write");
					res.send("added");
				});
			}
		});
	}
});
app.put('/users/:id',function(req,res){
	// CRUD : Update
	if(!req.body.name || !req.body.password){
		res.send("need name, password");
	}else{
		fs.readFile("./node5_users.json","utf8",function(err,data){
			var users = JSON.parse(data);
			if(users[req.params.id]){
				users[req.params.id] = {
					password : req.body.password,
					name : req.body.name
				};
				fs.writeFile("./node5_users.json",JSON.stringify(users,null,"\t"),"utf8",function(err){
					if(err) res.send("cannot write");
					res.send("updated");
				});
			}else{
				res.send("nope.");
			}
		});
	}
});
app.delete('/users/:id',function(req,res){
	// CRUD : Update
	if(!req.body.password){
		res.send("need password");
	}else{
		fs.readFile("./node5_users.json","utf8",function(err,data){
			var users = JSON.parse(data);
			if(users[req.params.id]){
				if(users[req.params.id].password !== req.body.password)
					return res.send("incorrect password"); 
				delete users[req.params.id];
				fs.writeFile("./node5_users.json",JSON.stringify(users,null,"\t"),"utf8",function(err){
					if(err) res.send("cannot write");
					res.send("deleted");
				});
			}else{
				res.send("nope.");
			}
		});
	}
});
app.listen(3000,function(){
	console.log('connected 3000 port!');
});