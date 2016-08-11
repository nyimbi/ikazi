var pageSession = new ReactiveDict();

Template.AdminPageUsersDetails.rendered = function() {
	
};

Template.AdminPageUsersDetails.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_page.users", {  });
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_page.users", {  });
	}
});

Template.AdminPageUsersDetails.helpers({
	
});

Template.AdminPageUsersDetailsDetailsForm.rendered = function() {
	

	pageSession.set("adminPageUsersDetailsDetailsFormInfoMessage", "");
	pageSession.set("adminPageUsersDetailsDetailsFormErrorMessage", "");

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

Template.AdminPageUsersDetailsDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminPageUsersDetailsDetailsFormInfoMessage", "");
		pageSession.set("adminPageUsersDetailsDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminPageUsersDetailsDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(adminPageUsersDetailsDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminPageUsersDetailsDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminPageUsersDetailsDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users", {});
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("admin.users", {});
	}

	
});

Template.AdminPageUsersDetailsDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminPageUsersDetailsDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminPageUsersDetailsDetailsFormErrorMessage");
	}
	
});
