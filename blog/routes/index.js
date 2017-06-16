var express = require('express');
var router = express.Router();
var mongodb = require('mongodb').MongoClient;
var db_str = "mongodb://127.0.0.1/blog"

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',});
});

router.get('/home', function(req, res, next) {
	 //连接articles集合
	 var arra = [];
	 //连接liuyan集合
	 var findData = function(db,callback){
		var conn = db.collection('liuyan')
		
		conn.find({}).sort({time:-1}).limit(5).toArray(function(err,result){
			callback(result);
		})
	}
	 
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('失败')
		}else{
			console.log('success')
			findData(db,function(result){
				result.forEach(function(item){
					arra.push(item.title)
				})
			})
		}
		
	})	
	 var finData = function(db,callback){
		var con = db.collection('articles')
		
		con.find({}).toArray(function(err,result){
			//console.log(result)
			callback(result);
		})
	}	
	
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('失败')
		}else{
			console.log('success')
			finData(db,function(result){
				console.log(result)
				/*req.session.tit = result[0].title;*/
				res.render('home',{user:req.session.user,results:result,liuyan:arra})
				
			})
		}
		
	})	
	

});

router.get('/header',function(req,res,next){
	res.render('header',{})
});

router.get('/register',function(req,res,next){
	res.render('register',{})
});

router.get('/login',function(req,res,next){
	res.render('login',{})
})

router.get('/liuyan',function(req,res,next){
	
	var findData = function(db,callback){
		var conn = db.collection('liuyan')
		
		conn.find({}).sort({time:-1}).limit(5).toArray(function(err,result){
			callback(result);
		})
	}
	
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('失败')
		}else{
			console.log('success')
			findData(db,function(result){
				//console.log(result)
				/*req.session.tit = result[0].title;*/
				res.render('liuyan',{result:result,user:req.session.user})
				
			})
		}
		
	})	
})




router.get('/relogin',function(req,res,next){
	//res.render('relogin',{})
	req.session.destroy(function(err){
		if(!err){
			res.redirect('/')
		}
	})
})


router.get('/log',function(req,res,next){
	
	var findData1 = function(db,callback){
		var conn = db.collection('articles')
		
		conn.find({}).limit(5).toArray(function(err,con1){
			callback(con1);
		})
	}
	
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log('失败')
		}else{
			console.log('success')
			findData1(db,function(con1){
				//console.log(result)
				/*req.session.tit = result[0].title;*/
				res.render('log',{con1:con1,user:req.session.user})
				
			})
		}
		
	})	
})



router.get('/addArt',function(req,res,next){
	res.render('addArt',{user:req.session.user})
})


router.get('/photo',function(req,res,next){
	res.render('photo',{user:req.session.user})
})





module.exports = router;
