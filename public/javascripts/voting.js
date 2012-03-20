/**
 * @author Takahiro Kubo
 */

var saObj = null;

$(function(){
	reload();
})

function reload(){
	$("#pnlScheduleList").empty();
	$("#pnlScheduleList").load("/reloadList",{"said":$(".form>#parentId").val()});
}

function scheduleDelete(objid){
	var sc = {"schedule":
				{	"id":objid,
					"parentId":$(".form>#parentId").val()
				},
				"aType":"delete"
			}
	$("#pnlScheduleList").load("/schedule",sc);	
}

function scheduleAdd(){
	var sc = {"schedule":
				{	"sDate":$(".form>#sDate").val(), 
					"sTime":$(".form>#sTime").val() , 
					"parentId":$(".form>#parentId").val()
				},
			  "aType":"create"
			}
	$("#pnlScheduleList").load("/schedule",sc);	
}


function voteAdd(pid){
	votePost(pid,"create");
}
function voteChange(pid,id){
	votePost(pid,"update",id);
}

function votePost(pid,t,id){
	var vId = ""
	if(arguments.length > 2){
		vId = id
	}
	
	var v = {"vote":
			{	"id":id,
				"name":"tester", 
				"status":"OK "+t+" !" , 
				"comment":"",
				"parentId":$(".form>#parentId").val() + "/" + pid
			},
		  "aType":t
		}	
	$("#pnlScheduleList").load("/vote",v);	
}
