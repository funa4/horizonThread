/**
 * @author Takahiro Kubo
 */
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
