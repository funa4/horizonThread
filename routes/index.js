
/*
 * GET home page.
 */

//Route to home
exports.index = function(db,req, res){
	var said = req.param("said","")
	if(said == ""){
		res.render('index', { title: 'HorizonThread' })	
	}else{
		//connect to db
		db.connectDB()
			
		var schema = require('../schemas/ScheduleAdjust.js');
		schema.ScheduleAdjustRegister(db);
		var ScheduleAdjust = db.model("ScheduleAdjust")
		
		//find schedule
		ScheduleAdjust.findOne({_id:said},function(err,obj){
			db.disconnect();
			res.render('vote', { saObj:obj});	
		})
		
	}
};

//Route for login , get or create ScheduleAdjust
exports.login = function(db,req,res){
	//connect to db
	db.connectDB()
		
	var schema = require('../schemas/ScheduleAdjust.js');
	schema.ScheduleAdjustRegister(db);
	var ScheduleAdjust = db.model("ScheduleAdjust")
	
	//find schedule
	ScheduleAdjust.findOne({name:req.body.login.name},
		function(err,obj){
			console.log("find object is " + obj );
			if(obj == null){
				//create schedule
				obj = new ScheduleAdjust();
				obj.name = req.body.login.name;
				obj.save(function(err){
					if(err){
						db.disconnect();
						res.render('index', {msg:" when schedule adjustment creating , occur error"})												
					}
				});
			}
			db.disconnect();
			res.render('vote', { saObj:obj});
		});
}

exports.reloadList = function(db,req, res){
	//connect to db
	db.connectDB()
		
	var schema = require('../schemas/ScheduleAdjust.js');
	schema.ScheduleAdjustRegister(db);
	var ScheduleAdjust = db.model("ScheduleAdjust")
	
	//find schedule
	console.log("load data of " + req.param("said",""))
	ScheduleAdjust.findOne({_id:req.param("said","")},function(err,obj){
		db.disconnect();
		console.log("load data end " + obj)
		res.render('hp_scheduleList', { layout:false,saObj:obj});	
	})
};

//Route for manage Schedule
exports.schedule = function(db,req, res){
	//connect to db
	db.connectDB()
		
	//create schedule object
	var schema = require('../schemas/ScheduleAdjust.js');
	schema.ScheduleAdjustRegister(db);
	var Schedule = db.model("Schedule");
	
	//set request Data	
	console.log("request data is " + req.body.schedule.id + "/" +req.body.schedule.sDate)
	var sc = new Schedule();
	var sc_id =req.body.schedule.id;
	var actionType = req.param("aType","")
	sc.sDate = req.body.schedule.sDate;
	sc.sTime = req.body.schedule.sTime;
	
	//getParent
	var ScheduleAdjust = db.model("ScheduleAdjust");
	ScheduleAdjust.findOne({_id:req.body.schedule.parentId},function(err,obj){
		if(!err && obj != null){
			//create schedule date
			switch(actionType){
				case "create":
					obj.schedules.push(sc)
					obj.save(function(err){ 
						console.log("create schedule " + obj)
						db.disconnect(); res.render('hp_scheduleList', { layout:false,saObj:obj});	
					});
					break;		
				case "delete":
					obj.schedules.id(sc_id).remove();
					obj.save(function(err){ 
						console.log("delete schedule " + sc_id)
						db.disconnect(); res.render('hp_scheduleList', { layout:false,saObj:obj});	
					});
					break;
			}
		}else{
			//error handling
			db.disconnect();
			res.end({msg:" when schedule " + actionType + " , occur error"});
		}
	})

};

exports.vote = function(db,req, res, actionType){
	//connect to db
	db.connectDB()
		
	//create schedule object
	var schema = require('../schemas/ScheduleAdjust.js');
	schema.ScheduleAdjustRegister(db);
	var Vote = db.model("Vote");
	
	//set request Data	
	console.log("request data is " + req.body.vote.parentId + " : " +req.body.vote.id)
	var v = new Vote();
	var v_id =req.body.vote.id;
	var actionType = req.param("aType","")
	var ids = req.body.vote.parentId.split("/");
	var sa_id = ids[0];
	var sc_id = ids[1];
	v.name = req.body.vote.name;
	v.status = req.body.vote.status;
	v.comment = req.body.vote.comment;
	
	//getParent
	var ScheduleAdjust = db.model("ScheduleAdjust");
	ScheduleAdjust.findOne({_id:sa_id},function(err,obj){
		if(!err && obj != null){
			//get date
			var sc = obj.schedules.id(sc_id);
			
			//create schedule date
			switch(actionType){
				case "create":
					sc.votes.push(v)
					obj.save(function(err){ 
						console.log("create vote " + obj.schedules.id[sc_id])
						db.disconnect(); res.render('hp_scheduleList', { layout:false,saObj:obj});	
					});
					break;		
				case "update":
					sc.votes.id(v_id).name = v.name;
					sc.votes.id(v_id).status = v.status;
					sc.votes.id(v_id).comment = v.comment;

					obj.save(function(err){ 
						console.log("update vote " + obj.schedules.id(sc_id).votes.id(v_id))
						db.disconnect(); res.render('hp_scheduleList', { layout:false,saObj:obj});	
					});
					break;
			}
		}else{
			//error handling
			db.disconnect();
			res.end({msg:" when voting " + actionType + " , occur error"});
		}
	})	
};
