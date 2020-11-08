$(document).ready(function(){
	$('#questtable').dataTable({
		"order": [[ 0, "asc" ]],
		"lengthMenu": [10, 20],
		"pageLength": 10,
		"columnDefs": [ {
			"targets"  : 'no-sort',
			"orderable": false,
			"order": []
		}]
	});
});