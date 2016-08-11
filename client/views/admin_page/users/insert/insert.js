var pageSession = new ReactiveDict();

Template.AdminPageUsersInsert.rendered = function() {
	
};

Template.AdminPageUsersInsert.events({
	
	"click #page-close-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_page.users", {  });
	},
	"click #page-back-button": function(e, t) {
		e.preventDefault();
		Router.go("admin_page.users", {  });
	}
});

Template.AdminPageUsersInsert.helpers({
	
});

Template.AdminPageUsersInsertInsertForm.rendered = function() {
	

	pageSession.set("adminPageUsersInsertInsertFormInfoMessage", "");
	pageSession.set("adminPageUsersInsertInsertFormErrorMessage", "");

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

Template.AdminPageUsersInsertInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("adminPageUsersInsertInsertFormInfoMessage", "");
		pageSession.set("adminPageUsersInsertInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var adminPageUsersInsertInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(adminPageUsersInsertInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("adminPageUsersInsertInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("admin.users", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("adminPageUsersInsertInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("createUserAccount", values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("admin.users", {});
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

Template.AdminPageUsersInsertInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("adminPageUsersInsertInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("adminPageUsersInsertInsertFormErrorMessage");
	}
	
});
