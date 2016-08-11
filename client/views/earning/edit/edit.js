var pageSession = new ReactiveDict();

Template.EarningEdit.rendered = function() {
	
};

Template.EarningEdit.events({
	
});

Template.EarningEdit.helpers({
	
});

Template.EarningEditForm.rendered = function() {
	

	pageSession.set("earningEditFormInfoMessage", "");
	pageSession.set("earningEditFormErrorMessage", "");

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

Template.EarningEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("earningEditFormInfoMessage", "");
		pageSession.set("earningEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var earningEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(earningEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("earningEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("earning", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("earningEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Earnings.update({ _id: t.data.earnings_selected._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.EarningEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("earningEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("earningEditFormErrorMessage");
	}
	
});
