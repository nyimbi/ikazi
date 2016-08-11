var pageSession = new ReactiveDict();

Template.WorkLocationsInsert.rendered = function() {
	
};

Template.WorkLocationsInsert.events({
	
});

Template.WorkLocationsInsert.helpers({
	
});

Template.WorkLocationsInsertForm.rendered = function() {
	

	pageSession.set("workLocationsInsertFormInfoMessage", "");
	pageSession.set("workLocationsInsertFormErrorMessage", "");

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

Template.WorkLocationsInsertForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("workLocationsInsertFormInfoMessage", "");
		pageSession.set("workLocationsInsertFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var workLocationsInsertFormMode = "insert";
			if(!t.find("#form-cancel-button")) {
				switch(workLocationsInsertFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("workLocationsInsertFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("work_locations", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("workLocationsInsertFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				newId = WorkLocs.insert(values, function(e) { if(e) errorAction(e); else submitAction(); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("work_locations", {});
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

Template.WorkLocationsInsertForm.helpers({
	"infoMessage": function() {
		return pageSession.get("workLocationsInsertFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("workLocationsInsertFormErrorMessage");
	}
	
});
