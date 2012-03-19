
/*
 * GET home page.
 */

exports.index = function(req, res){
  res.render('index', { title: 'HorizonThread' })
};

//have to load schemas before
exports.login = function(db,req,res){	
	//getSchemas
	var schema = require('../schemas/ScheduleAdjust.js');
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
					db.disconnect();
					res.render('vote', { title: 'Schedule Voting' , schedule:schedule});				
				});
			}else{				
				db.disconnect();
				res.render('vote', { title: 'Schedule Voting', schedule:obj})		
			}
			
		});
	
}
