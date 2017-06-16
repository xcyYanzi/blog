var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var db_str = 'mongodb://127.0.0.1:27017/blog'


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register',function(req,res,next){

	//res.send('注册成功')
	
	//req.body['zh'] ===>账号.value
	var zh = req.body['zh'];
	var pass = req.body['pass'];
	
	var insertData = function(db,callback){
		var conn = db.collection('users')
		var data = [{user:zh,pass:pass}]
		conn.insert(data,function(err,result){
			callback(result);
		})
	}
	
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('失败')
		}else{
			console.log('success')
			insertData(db,function(result){
				console.log(result)
				res.redirect('/')
				db.close()
			})
		}
		
	})
	
})

router.post('/login',function(req,res,next){

	//res.send('登陆成功')
	
	//req.body['zh'] ===>账号.value
	var zh = req.body['zh'];
	var pass = req.body['pass'];
	
	var findData = function(db,callback){
		var conn = db.collection('users')
		var data ={user:zh,pass:pass,}
		
		conn.find(data).toArray(function(err,result){
			callback(result);
		})
	}
	
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('失败')
		}else{
			console.log('success')
			findData(db,function(result){
				console.log(result)
				if(result.length>0){
					//存储用户名
					req.session.user = result[0].user;
					console.log(req.session.user)
					//跳转
					res.redirect('/home')
					db.close()
				}else{
					res.redirect('/')
					db.close()
				}
			})
		}
		
	})
	
})


router.post('/liuyan',function(req,res,next){

	//res.send('发布留言')
	
	//req.body['zh'] ===>账号.value
	if(req.session.user){
	
	var title = req.body['title'];
	var con = req.body['con'];
	
	var insertData = function(db,callback){
		var conn = db.collection('liuyan')
		var oDate=new Date();
		var hh=oDate.getHours();
		var mm=oDate.getMinutes();
		var ss=oDate.getSeconds();
		var riqi = oDate.toLocaleDateString();
		hh = hh < 10 ? "0" + hh : hh;
		mm = mm < 10 ? "0" + mm : mm;
		ss = ss < 10 ? "0" + ss : ss;
		var str1=''+riqi+' '+hh+':'+mm+':'+ss
		var data = [{title:title,con:con,time:str1}]
		conn.insert(data,function(err,result){
			callback(result);
		})
	}
	
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('失败')
		}else{
			console.log('success')
			insertData(db,function(result){
				console.log(result)
				res.redirect('/liuyan')
				db.close()
			})
		}
		
	})
	}else{
		res.send('账号未登录')
	}
})


router.post('/log',function(req,res,next){

	//res.send('发布日志')
	
	//req.body['zh'] ===>账号.value
	if(req.session.user){
	
	var title = req.body['title'];
	var con = req.body['con'];
	
	var insertData = function(db,callback){
		var conn = db.collection('articles')
		var data = [{title:title,con:con}]
		conn.insert(data,function(err,result){
			callback(result);
		})
	}
	
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('失败')
		}else{
			console.log('success')
			insertData(db,function(result){
				console.log(result)
				res.redirect('/log')
				db.close()
			})
		}
		
	})
	}else{
		res.send('账号未登录')
	}
})


router.post('/addArt',function(req,res,next){

	//res.send('发布日志')
	
	//req.body['zh'] ===>账号.value
	if(req.session.user){
	
	var title = req.body['title'];
	var con = req.body['con'];
	
	var insertData = function(db,callback){
		var conn = db.collection('articles')
		var data = [{title:title,con:con}]
		conn.insert(data,function(err,result){
			callback(result);
		})
	}
	
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('失败')
		}else{
			console.log('success')
			insertData(db,function(result){
				console.log(result)
				res.redirect('/log')
				db.close()
			})
		}
		
	})
	}else{
		res.send('账号未登录')
	}
})




module.exports = router;
