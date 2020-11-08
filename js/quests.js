$(document).on('submit', '#frmFilterQuest', function(event) {
    event.preventDefault();
    $('#questid').attr('disabled', true);
    $('#level').attr('disabled', true);
    $('#givenby').attr('disabled', true);
	$('#questSubmit').attr('disabled', true);
	$('#questReset').attr('disabled', true);
    var questid = $('#questid').val();
    var level = $('#level').val();
	var givenby = $('#givenby').val();
    $.post("/quests?act=getquest", {
        questid: questid,
        level: level,
        givenby: givenby
    }, function(response){
        try {
            var jsonResult = response;
            if (jsonResult.success == true) {
                $('#filteredquests').html(jsonResult.html);
				$('#filteredquests').show();
                //Initialize the data tables
				$('#filterquesttable').dataTable({
					"order": [[ 4, "desc" ]],
					"lengthMenu": [10, 20],
					"pageLength": 10,
					"columnDefs": [ {
						"targets"  : 'no-sort',
						"orderable": false,
						"order": []
					}]
				});
				$("#allquests").hide();
            } else {
                //Show error message
				$('#filteredquests').html('<div class="alert alert-danger mt-md-2" role="alert">' + jsonResult.response_text + '</div>');
				$('#filteredquests').show();
                $("#allquests").hide();
            }
        }
        catch (e) {
            window.alert(e.message);
            //location.reload();
        } finally {
			$('#questid').attr('disabled', false);
			$('#level').attr('disabled', false);
			$('#givenby').attr('disabled', false);
			$('#questSubmit').attr('disabled', false);
			$('#questReset').attr('disabled', false);
		}
    });
});

$(document).on('reset', '#frmFilterQuest', function(event) {
	$("#allquests").show();
	$('#filteredquests').hide();
});