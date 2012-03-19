
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'HorizonThread' })
};

//have to load schemas before
exports.login = function(db,req,res){
	//load schema
	var schema = require('../schemas/ScheduleAdjust.js');
	
	//connect to db
	db.connectDB(function(){
		console.log("connected to db ")
		
		//getSchemas
		var ScheduleAdjust = schema.ScheduleAdjust(db);
	
		//find schedule
		ScheduleAdjust.findOne({id:req.body.login.id},
			function(err,obj){
				console.log("find object is " + obj );
				
				if(obj == null){
					//create schedule
					schedule = new ScheduleAdjust();
					schedule.id = req.body.login.id ;
					schedule.name = req.body.login.name;
					
					schedule.save(function(err){
						res.render('vote', { title: 'Schedule Voting' , schedule:schedule});				
					});
				}else{				
					res.render('vote', { title: 'Schedule Voting', schedule:obj})		
				}
				
			});
		
	})
	
	//res.render('vote', { title: 'Schedule Voting'})	
}
