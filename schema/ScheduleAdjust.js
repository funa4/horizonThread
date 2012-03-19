/**
 * @author 久保 隆宏
 */
var mongoose = require("mongoose");

//createSchema Object
var Schema = mongoose.Schema;

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
	title:String,
	fixDate:String,
	fixTime:String,
	comment:String,
	schedules:[Schedule]
});