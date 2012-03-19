
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'HorizonThread' })
};

//have to load schemas before
exports.login = function(db,req,res){
	//connect to db by extended function
	//db.connectDB();
	
	//getSchemas
	var schema = require('../schemas/ScheduleAdjust.js');
	//var ScheduleAdjust = schema.ScheduleAdjust(db);
	schema.ScheduleAdjust(db);
	console.log("connect start" );
	var connection = db.connectDB()
	var ScheduleAdjust = connection.model("ScheduleAdjust");
	console.log("connect end " + connection.readyState);
	
	//find schedule
	if(connection.readyState == 2){
	ScheduleAdjust.findOne({id:req.body.login.id},
		function(err,obj){
			console.log("find object is " + obj );
			
			if(obj == null){
				//create schedule
				schedule = new ScheduleAdjust();
				schedule.id = req.body.login.id ;
				schedule.name = req.body.login.name;
				
				schedule.save(function(err){
					db.disconnect();
					res.render('vote', { title: 'Schedule Voting' , schedule:schedule});				
				});
			}else{				
				db.disconnect();
				res.render('vote', { title: 'Schedule Voting', schedule:obj})		
			}
			
		});
	}else{
		console.log("connect not end");
		res.render('vote')	
	}
	
}
