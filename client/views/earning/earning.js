var pageSession = new ReactiveDict();

Template.Earning.rendered = function() {
	
};

Template.Earning.events({
	
});

Template.Earning.helpers({
	
});

var EarningListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("EarningListSearchString");
	var sortBy = pageSession.get("EarningListSortBy");
	var sortAscending = pageSession.get("EarningListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["worker", "task", "task_value", "task_date", "task_quality", "task_accepted"];
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

var EarningListExport = function(cursor, fileType) {
	var data = EarningListItems(cursor);
	var exportFields = ["worker", "task", "task_value", "task_date", "task_quality", "task_accepted"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.EarningList.rendered = function() {
	pageSession.set("EarningListStyle", "table");
	
};

Template.EarningList.events({
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
				pageSession.set("EarningListSearchString", searchString);
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
					pageSession.set("EarningListSearchString", searchString);
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
					pageSession.set("EarningListSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("earning.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		EarningListExport(this.earnings, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		EarningListExport(this.earnings, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		EarningListExport(this.earnings, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		EarningListExport(this.earnings, "json");
	}

	
});

Template.EarningList.helpers({

	"insertButtonClass": function() {
		return Earnings.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.earnings || this.earnings.count() == 0;
	},
	"isNotEmpty": function() {
		return this.earnings && this.earnings.count() > 0;
	},
	"isNotFound": function() {
		return this.earnings && pageSession.get("EarningListSearchString") && EarningListItems(this.earnings).length == 0;
	},
	"searchString": function() {
		return pageSession.get("EarningListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("EarningListStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("EarningListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("EarningListStyle") == "gallery";
	}

	
});


Template.EarningListTable.rendered = function() {
	
};

Template.EarningListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("EarningListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("EarningListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("EarningListSortAscending") || false;
			pageSession.set("EarningListSortAscending", !sortAscending);
		} else {
			pageSession.set("EarningListSortAscending", true);
		}
	}
});

Template.EarningListTable.helpers({
	"tableItems": function() {
		return EarningListItems(this.earnings);
	}
});


Template.EarningListTableItems.rendered = function() {
	
};

Template.EarningListTableItems.events({
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

		Earnings.update({ _id: this._id }, { $set: values });

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
						Earnings.remove({ _id: me._id });
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
		Router.go("earning.edit", {customerId: this._id});
		return false;
	}
});

Template.EarningListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Earnings.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Earnings.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
