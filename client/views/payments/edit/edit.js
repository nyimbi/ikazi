var pageSession = new ReactiveDict();

Template.PaymentsEdit.rendered = function() {
	
};

Template.PaymentsEdit.events({
	
});

Template.PaymentsEdit.helpers({
	
});

Template.PaymentsEditForm.rendered = function() {
	

	pageSession.set("paymentsEditFormInfoMessage", "");
	pageSession.set("paymentsEditFormErrorMessage", "");

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

Template.PaymentsEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("paymentsEditFormInfoMessage", "");
		pageSession.set("paymentsEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var paymentsEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(paymentsEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("paymentsEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("payments", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("paymentsEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Payments.update({ _id: t.data.payments_selected._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("payments", {});
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

Template.PaymentsEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("paymentsEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("paymentsEditFormErrorMessage");
	}
	
});
