/**
 * @author Takahiro Kubo
 */

$(function(){
	reload();	
})

function reload(){
	$("#pnlScheduleList").empty();
	$("#pnlScheduleList").load("/reloadList",{"said":$("#parentId").val()},
	 function(){
	 	//set mobile style
	 	$("#pnlScheduleList").find("a[data-role=button]").button();	 	
	 	$("#pnlScheduleList").find("div[data-role=collapsible]").collapsible({refresh:true});	
	 	
	 	//get objid
	 	if(localStorage.getItem($("#parentId").val()) == null){
		 	localStorage.setItem($("#parentId").val(),$("#parentName").val()) 		
	 	}
	 }
	);
	
}

function scAdjustDelete(){
	if(window.confirm(" このスケジュールを削除します。よろしいですか？ ")){
  	 localStorage.removeItem($("#parentId").val()) 		
	 location.href = "/scAdjustDelete?said=" + $("#parentId").val()
	}
}

function scheduleDelete(objid){
	if(window.confirm(" 日付を削除します。よろしいですか？ ")){
	 var sc = {"schedule":
				{	"id":objid,
					"parentId":$("#parentId").val()
				},
				"aType":"delete"
			}
	 $("#pnlScheduleList").load("/schedule",sc,reload);	
    }
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


function voteSave(scheduleId,voteId){
	votePost(scheduleId,"save",voteId);
}

function voteDelete(scheduleId,voteId){
	votePost(scheduleId,"delete",voteId);
}

function votePost(scheduleId,exeType,voteId){

	//initialize dialg control 
	$("fieldset[data-role='controlgroup']").controlgroup({refresh:true}); 
	$("input[type='radio']").checkboxradio({refresh:true}); 
	
	//set value
	$("#dialogTitle").text($("#"+scheduleId).attr("area-name") +" への参加")

	if(voteId != ""){
	  var name = $("#"+ scheduleId +" #" + voteId + " .vName").text();
	  $("#vName").val( name );	
	}else{
	  $("#vName").val( $("#name").val() );		
	}
	
	$("#sc_id").val( scheduleId );
	$("#v_id").val( voteId );
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
		},300)
	}
	
}

function moveMySchedule(){
	var url = "http://" + location.hostname + location.pathname;
	location.href = "mailto:?body=下記サイトで日程の記入をお願いします%0D%0A"+url+"?said="+ $("#parentId").val()
}
