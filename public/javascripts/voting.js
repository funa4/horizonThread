/**
 * @author Takahiro Kubo
 */

var saObj = null;

$(function(){
	reload();
})

function reload(){
	$("#pnlScheduleList").empty();
	$("#pnlScheduleList").load("/reloadList",{"said":$("#parentId").val()},
	 function(){
	 	$("#pnlScheduleList").find("a[data-role=button]").button();	 	
	 	$("#pnlScheduleList").find("div[data-role=collapsible]").collapsible({refresh:true});	
	 }
	);
	
}

function scheduleDelete(objid){
	var sc = {"schedule":
				{	"id":objid,
					"parentId":$("#parentId").val()
				},
				"aType":"delete"
			}
	$("#pnlScheduleList").load("/schedule",sc,reload);	
}

function scheduleAdd(){
	if($("#sDate").val() == ""){
		$("#msg").text("日付は入力せな");
	}else{
		var sc = {"schedule":
					{	"sDate":$("#sDate").val(), 
						"sTime":$("#sTime").val() , 
						"parentId":$("#parentId").val()
					},
				  "aType":"create"
				}
		$("#pnlScheduleList").load("/schedule",sc,reload);	
		$("#msg").text("");
	}
}


function voteAdd(scheduleId){
	votePost(scheduleId,"create");
}
function voteChange(scheduleId,voteId){
	votePost(scheduleId,"update",voteId);
}
function voteDelete(scheduleId,voteId){
	votePost(scheduleId,"delete",voteId);
}

function votePost(scheduleId,exeType,voteId){
	var vId = ""
	if(arguments.length > 2){
		vId = voteId
	}

	//initialize dialg control 
	$("fieldset[data-role='controlgroup']").controlgroup({refresh:true}); 
	$("input[type='radio']").checkboxradio({refresh:true}); 
	
	//set value
	$("#dialogTitle").text($("#"+scheduleId).attr("area-name") +" への参加")
	$("#vName").val( $("#name").val() );
	$("#sc_id").val( scheduleId );
	$("#v_id").val( vId );
	$("#atype").val( exeType );

	if(exeType != "delete"){
		//open dialog
		$.mobile.changePage('#votingbox', {transition: 'pop', role: 'dialog'}); 		

	}else{
		voteExe();
	}	
}

function voteExe(){
	if($("#vName").val() == ""){
		alert("名前の入力は必須です！");	
	}else{
		var status = $("input[name=voting]:checked").val()
		var v = {"vote":
				{	"id":$("#v_id").val(),
					"name":$("#vName").val(), 
					"status":status, 
					"comment":$("#vComment").val(),
					"parentId":$("#parentId").val() + "/" + $("#sc_id").val()
				},
			  "aType":$("#atype").val()
			}	
		$("#pnlScheduleList").load("/vote",v,reload);	
		if($("#name").val() == ""){//synchronous name		
			$("#name").val( $("#vName").val() ); 
		}
		
		if($("#atype").val() != "delete"){
			$('.ui-dialog').dialog('close');		
		}
		
		setTimeout(function(){
			$("#"+$("#sc_id").val()).trigger('expand');		
		},100)
	}
	
}

function sendMail(){
	location.href = "mailto:?body=スケジュール調整->"+document.location+"?said="+ $("#parentId").val()
}
