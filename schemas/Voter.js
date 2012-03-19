/**
 * @author Takahiro Kubo
 */
exports.Voter = function(mg_connected){

var Schema = mg_connected.Schema;

var Voter = new Schema({
	scheduleId:ObjectId,
	name:String
})

//create model
return mg_connected.model('Voter', Voter);
	
}
