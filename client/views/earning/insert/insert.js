var pageSession = new ReactiveDict();

Template.EarningInsert.rendered = function() {
	
};

Template.EarningInsert.events({
	
});

Template.EarningInsert.helpers({
	
});

Template.EarningInsertForm.rendered = function() {
	

	pageSession.set("earningInsertFormInfoMessage", "");
	pageSession.set("earningInsertFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
};

Template.EarningInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("earningInsertFormInfoMessage", "");
		pageSession.set("earningInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var earningInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(earningInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("earningInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("earning", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("earningInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Earnings.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("earning", {});
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.EarningInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("earningInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("earningInsertFormErrorMessage");
	}
	
});
