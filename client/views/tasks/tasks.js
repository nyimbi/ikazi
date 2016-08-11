var pageSession = new ReactiveDict();

Template.Tasks.rendered = function() {
	
};

Template.Tasks.events({
	
});

Template.Tasks.helpers({
	
});

var TasksListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("TasksListSearchString");
	var sortBy = pageSession.get("TasksListSortBy");
	var sortAscending = pageSession.get("TasksListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["task_guid", "pj_id", "task_seq", "task_name", "task_data", "task_data_type", "task_start", "task_end", "task_complete", "task_in_process", "task_assigned", "task_booked", "task_worker", "task_output", "task_quality", "task_rejected", "task_accepted", "task_under_review", "task_difficulty_rating", "task_grp", "task_pj", "task_value", "task_value_hi", "task_value_lo", "task_tags", "task_priority"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var TasksListExport = function(cursor, fileType) {
	var data = TasksListItems(cursor);
	var exportFields = ["task_guid", "pj_id", "task_seq", "task_name", "task_data", "task_data_type", "task_start", "task_end", "task_complete", "task_in_process", "task_assigned", "task_booked", "task_worker", "task_output", "task_quality", "task_rejected", "task_accepted", "task_under_review", "task_difficulty_rating", "task_grp", "task_pj", "task_value", "task_value_hi", "task_value_lo", "task_tags", "task_priority"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.TasksList.rendered = function() {
	pageSession.set("TasksListStyle", "table");
	
};

Template.TasksList.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("TasksListSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("TasksListSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("TasksListSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("tasks.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		TasksListExport(this.tasks, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		TasksListExport(this.tasks, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		TasksListExport(this.tasks, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		TasksListExport(this.tasks, "json");
	}

	
});

Template.TasksList.helpers({

	"insertButtonClass": function() {
		return Tasks.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.tasks || this.tasks.count() == 0;
	},
	"isNotEmpty": function() {
		return this.tasks && this.tasks.count() > 0;
	},
	"isNotFound": function() {
		return this.tasks && pageSession.get("TasksListSearchString") && TasksListItems(this.tasks).length == 0;
	},
	"searchString": function() {
		return pageSession.get("TasksListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("TasksListStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("TasksListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("TasksListStyle") == "gallery";
	}

	
});


Template.TasksListTable.rendered = function() {
	
};

Template.TasksListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("TasksListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("TasksListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("TasksListSortAscending") || false;
			pageSession.set("TasksListSortAscending", !sortAscending);
		} else {
			pageSession.set("TasksListSortAscending", true);
		}
	}
});

Template.TasksListTable.helpers({
	"tableItems": function() {
		return TasksListItems(this.tasks);
	}
});


Template.TasksListTableItems.rendered = function() {
	
};

Template.TasksListTableItems.events({
	"click td": function(e, t) {
		e.preventDefault();
		
		/**/
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Tasks.update({ _id: this._id }, { $set: values });

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Tasks.remove({ _id: me._id });
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("tasks.edit", {customerId: this._id});
		return false;
	}
});

Template.TasksListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Tasks.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Tasks.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
