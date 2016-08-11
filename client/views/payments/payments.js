var pageSession = new ReactiveDict();

Template.Payments.rendered = function() {
	
};

Template.Payments.events({
	
});

Template.Payments.helpers({
	
});

var PaymentsListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("PaymentsListSearchString");
	var sortBy = pageSession.get("PaymentsListSortBy");
	var sortAscending = pageSession.get("PaymentsListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["pay_req_date", "pay_req_amount", "pay_req_story", "paid", "debit", "credit", "paid_date", "paid_how", "paid_to"];
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

var PaymentsListExport = function(cursor, fileType) {
	var data = PaymentsListItems(cursor);
	var exportFields = ["pay_req_date", "pay_req_amount", "pay_req_story", "paid", "debit", "credit", "paid_date", "paid_how", "paid_to"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.PaymentsList.rendered = function() {
	pageSession.set("PaymentsListStyle", "table");
	
};

Template.PaymentsList.events({
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
				pageSession.set("PaymentsListSearchString", searchString);
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
					pageSession.set("PaymentsListSearchString", searchString);
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
					pageSession.set("PaymentsListSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("payments.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		PaymentsListExport(this.payments, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		PaymentsListExport(this.payments, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		PaymentsListExport(this.payments, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		PaymentsListExport(this.payments, "json");
	}

	
});

Template.PaymentsList.helpers({

	"insertButtonClass": function() {
		return Payments.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.payments || this.payments.count() == 0;
	},
	"isNotEmpty": function() {
		return this.payments && this.payments.count() > 0;
	},
	"isNotFound": function() {
		return this.payments && pageSession.get("PaymentsListSearchString") && PaymentsListItems(this.payments).length == 0;
	},
	"searchString": function() {
		return pageSession.get("PaymentsListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("PaymentsListStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("PaymentsListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("PaymentsListStyle") == "gallery";
	}

	
});


Template.PaymentsListTable.rendered = function() {
	
};

Template.PaymentsListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("PaymentsListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("PaymentsListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("PaymentsListSortAscending") || false;
			pageSession.set("PaymentsListSortAscending", !sortAscending);
		} else {
			pageSession.set("PaymentsListSortAscending", true);
		}
	}
});

Template.PaymentsListTable.helpers({
	"tableItems": function() {
		return PaymentsListItems(this.payments);
	}
});


Template.PaymentsListTableItems.rendered = function() {
	
};

Template.PaymentsListTableItems.events({
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

		Payments.update({ _id: this._id }, { $set: values });

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
						Payments.remove({ _id: me._id });
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
		Router.go("payments.edit", {customerId: this._id});
		return false;
	}
});

Template.PaymentsListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Payments.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Payments.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
