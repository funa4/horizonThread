/**
 * @author Takahiro Kubo
 */

exports.ScheduleAdjustRegister = function(mg_connected){

var Schema = mg_connected.Schema //,ObjectId = Schema.ObjectId;

var Vote = new Schema({
	name:String,
	status:String,
	comment:String	
})

var Schedule = new Schema({
	sDate:String,
	sTime:String,
	votes:[Vote]	
})

//Define Schedule Adjust Data
var ScheduleAdjust = new Schema({
	id:String,
	name:String,
	fixDate:String,
	fixTime:String,
	comment:String,
	schedules:[Schedule]
});

//create model
mg_connected.model('ScheduleAdjust', ScheduleAdjust);
mg_connected.model('Schedule', Schedule);
mg_connected.model('Vote', Vote);

}

