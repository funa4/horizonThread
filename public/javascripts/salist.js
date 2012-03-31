/**
 * @author Takahiro Kubo
 */

$(function(){
	
	$("#postedList").empty();
	var appends = ""
	for(var k in localStorage){
		appends += '<option value="' + k + '">' + localStorage.getItem(k) + '</option>'
	}
	$("#postedList").append(appends)
	$("#postedList").selectmenu("refresh")
		
})

function jumpToSchedule(){
	var id = $("#postedList").val();
	location.href = "/login?said="+ id;	
}


function ping(){
	$.ajax({
        url: '/ping',
        dataType: "json",
        cache: false,
        timeout: 5000,
        success: function(data) {
        	alert(data.res);
        },
        error: function(jqXHR, textStatus, errorThrown) {
            alert('error ' + textStatus + " " + errorThrown);
        }
    });
		
}
