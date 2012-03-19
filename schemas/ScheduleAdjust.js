/**
 * @author Takahiro Kubo
 */

exports.ScheduleAdjust = function(mg_connected){

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
return mg_connected.model('ScheduleAdjust', ScheduleAdjust);

}




