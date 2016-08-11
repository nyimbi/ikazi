var pageSession = new ReactiveDict();

Template.WorkLocationsEdit.rendered = function() {
	
};

Template.WorkLocationsEdit.events({
	
});

Template.WorkLocationsEdit.helpers({
	
});

Template.WorkLocationsEditForm.rendered = function() {
	

	pageSession.set("workLocationsEditFormInfoMessage", "");
	pageSession.set("workLocationsEditFormErrorMessage", "");

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

Template.WorkLocationsEditForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("workLocationsEditFormInfoMessage", "");
		pageSession.set("workLocationsEditFormErrorMessage", "");

		var self = this;

		function submitAction(msg) {
			var workLocationsEditFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(workLocationsEditFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("workLocationsEditFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("work_locations", {});
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("workLocationsEditFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				WorkLocs.update({ _id: t.data.work_locs_selected._id }, { $set: values }, function(e) { if(e) errorAction(e); else submitAction(); });
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

Template.WorkLocationsEditForm.helpers({
	"infoMessage": function() {
		return pageSession.get("workLocationsEditFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("workLocationsEditFormErrorMessage");
	}
	
});
