function abrirMsgSucesso(msg) {
	demo.initChartist();

	$.notify({
		icon : 'ti-check',
		message : msg
	}, {
		type : 'success',
		timer : 4000
	});
}
function abrirMsgAlerta(msg) {
	demo.initChartist();

	$.notify({
		icon : 'ti-alert',
		message : msg

	}, {
		type : 'warning',
		timer : 4000
	});
}
function abrirMsgError(msg) {
	demo.initChartist();

	$.notify({
		icon : 'ti-alert',
		message : msg

	}, {
		type : 'danger'
		//timer : 4000
	});
}