var pageSession = new ReactiveDict();

Template.WorkLocations.rendered = function() {
	
};

Template.WorkLocations.events({
	
});

Template.WorkLocations.helpers({
	
});

var WorkLocationsListItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("WorkLocationsListSearchString");
	var sortBy = pageSession.get("WorkLocationsListSortBy");
	var sortAscending = pageSession.get("WorkLocationsListSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["wl_lat", "wl_lon", "wl_name", "wl_pic1", "wl_pic2", "wl_pic3", "wl_rooms", "wl_net_how", "wl_notes", "wl_mgr_name", "wl_mgr_phone", "wl_mgr_email", "wl_mgr_facebook", "wl_mgr_gplus", "wl_website", "wl_twitter", "wl_mgr_twitter", "wl_open_time", "wl_close_time", "wl_power_src", "wl_county", "wl_city", "wl_district", "wl_nearest_police", "wl_police_phone", "wl_police_ocpd_nm", "wl_ocpd_phone", "wl_ocs_nm", "wl_ocs_phone", "wl_comp_no", "wl_wifi", "wl_ssid", "wl_wifi_passwd", "wl_notes"];
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

var WorkLocationsListExport = function(cursor, fileType) {
	var data = WorkLocationsListItems(cursor);
	var exportFields = ["wl_lat", "wl_lon", "wl_name", "wl_pic1", "wl_pic2", "wl_pic3", "wl_rooms", "wl_net_how", "wl_notes", "wl_mgr_name", "wl_mgr_phone", "wl_mgr_email", "wl_mgr_facebook", "wl_mgr_gplus", "wl_website", "wl_twitter", "wl_mgr_twitter", "wl_open_time", "wl_close_time", "wl_power_src", "wl_county", "wl_city", "wl_district", "wl_nearest_police", "wl_police_phone", "wl_police_ocpd_nm", "wl_ocpd_phone", "wl_ocs_nm", "wl_ocs_phone", "wl_comp_no", "wl_wifi", "wl_ssid", "wl_wifi_passwd", "wl_notes"];

	var str = convertArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}


Template.WorkLocationsList.rendered = function() {
	pageSession.set("WorkLocationsListStyle", "table");
	
};

Template.WorkLocationsList.events({
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
				pageSession.set("WorkLocationsListSearchString", searchString);
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
					pageSession.set("WorkLocationsListSearchString", searchString);
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
					pageSession.set("WorkLocationsListSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("work_locations.insert", {});
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		WorkLocationsListExport(this.work_locs, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		WorkLocationsListExport(this.work_locs, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		WorkLocationsListExport(this.work_locs, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		WorkLocationsListExport(this.work_locs, "json");
	}

	
});

Template.WorkLocationsList.helpers({

	"insertButtonClass": function() {
		return WorkLocs.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.work_locs || this.work_locs.count() == 0;
	},
	"isNotEmpty": function() {
		return this.work_locs && this.work_locs.count() > 0;
	},
	"isNotFound": function() {
		return this.work_locs && pageSession.get("WorkLocationsListSearchString") && WorkLocationsListItems(this.work_locs).length == 0;
	},
	"searchString": function() {
		return pageSession.get("WorkLocationsListSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("WorkLocationsListStyle") == "table";
	},
	"viewAsList": function() {
		return pageSession.get("WorkLocationsListStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("WorkLocationsListStyle") == "gallery";
	}

	
});


Template.WorkLocationsListTable.rendered = function() {
	
};

Template.WorkLocationsListTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("WorkLocationsListSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("WorkLocationsListSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("WorkLocationsListSortAscending") || false;
			pageSession.set("WorkLocationsListSortAscending", !sortAscending);
		} else {
			pageSession.set("WorkLocationsListSortAscending", true);
		}
	}
});

Template.WorkLocationsListTable.helpers({
	"tableItems": function() {
		return WorkLocationsListItems(this.work_locs);
	}
});


Template.WorkLocationsListTableItems.rendered = function() {
	
};

Template.WorkLocationsListTableItems.events({
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

		WorkLocs.update({ _id: this._id }, { $set: values });

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
						WorkLocs.remove({ _id: me._id });
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
		Router.go("work_locations.edit", {customerId: this._id});
		return false;
	}
});

Template.WorkLocationsListTableItems.helpers({
	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return WorkLocs.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return WorkLocs.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
