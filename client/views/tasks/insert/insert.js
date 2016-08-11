var pageSession = new ReactiveDict();

Template.TasksInsert.rendered = function() {
	
};

Template.TasksInsert.events({
	
});

Template.TasksInsert.helpers({
	
});

Template.TasksInsertForm.rendered = function() {
	

	pageSession.set("tasksInsertFormInfoMessage", "");
	pageSession.set("tasksInsertFormErrorMessage", "");

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

Template.TasksInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("tasksInsertFormInfoMessage", "");
		pageSession.set("tasksInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var tasksInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(tasksInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("tasksInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("tasks", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("tasksInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = Tasks.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("tasks", {});
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

Template.TasksInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("tasksInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("tasksInsertFormErrorMessage");
	}
	
});
