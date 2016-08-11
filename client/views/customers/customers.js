var pageSession = new ReactiveDict();

Template.Customers.rendered = function() {
	
};

Template.Customers.events({
	
});

Template.Customers.helpers({
	
});

var CustomersListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("CustomersListSearchString");
	var sortBy = pageSession.get("CustomersListSortBy");
	var sortAscending = pageSession.get("CustomersListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["name", "tel_mob", "tel_fixed", "fax", "email", "contact_person", "phy_address", "postal_address", "website", "notes", "paid_to_date", "reg_date", "notes"];
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

var CustomersListExport = function(cursor, fileType) {
	var data = CustomersListItems(cursor);
	var exportFields = ["name", "tel_mob", "tel_fixed", "fax", "email", "contact_person", "phy_address", "postal_address", "website", "notes", "paid_to_date", "reg_date", "notes"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.CustomersList.rendered = function() {
	pageSession.set("CustomersListStyle", "table");
	
};

Template.CustomersList.events({
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
				pageSession.set("CustomersListSearchString", searchString);
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
					pageSession.set("CustomersListSearchString", searchString);
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
					pageSession.set("CustomersListSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("customers.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		CustomersListExport(this.customers, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		CustomersListExport(this.customers, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		CustomersListExport(this.customers, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		CustomersListExport(this.customers, "json");
	}

	
});

Template.CustomersList.helpers({

	"insertButtonClass": function() {
		return Customers.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.customers || this.customers.count() == 0;
	},
	"isNotEmpty": function() {
		return this.customers && this.customers.count() > 0;
	},
	"isNotFound": function() {
		return this.customers && pageSession.get("CustomersListSearchString") && CustomersListItems(this.customers).length == 0;
	},
	"searchString": function() {
		return pageSession.get("CustomersListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("CustomersListStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("CustomersListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("CustomersListStyle") == "gallery";
	}

	
});


Template.CustomersListTable.rendered = function() {
	
};

Template.CustomersListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("CustomersListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("CustomersListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("CustomersListSortAscending") || false;
			pageSession.set("CustomersListSortAscending", !sortAscending);
		} else {
			pageSession.set("CustomersListSortAscending", true);
		}
	}
});

Template.CustomersListTable.helpers({
	"tableItems": function() {
		return CustomersListItems(this.customers);
	}
});


Template.CustomersListTableItems.rendered = function() {
	
};

Template.CustomersListTableItems.events({
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

		Customers.update({ _id: this._id }, { $set: values });

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
						Customers.remove({ _id: me._id });
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
		Router.go("customers.edit", {customerId: this._id});
		return false;
	}
});

Template.CustomersListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Customers.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Customers.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
