this.WorkLocs = new Mongo.Collection("work_locs");

this.WorkLocs.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","trainer"]);
};

this.WorkLocs.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","trainer"]);
};

this.WorkLocs.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin","trainer"]);
};

this.Schemas = this.Schemas || {};

this.Schemas.WorkLocs = new SimpleSchema({
	wl_lat: {
		label: "Lat.",
		type: String,
		optional: true
	},
	wl_lon: {
		label: "Lon.",
		type: String,
		optional: true
	},
	wl_name: {
		label: "Name",
		type: String,
		optional: true
	},
	wl_pic1: {
		label: "Picture (1)",
		type: Object,
		blackbox: true,
		optional: true
	},
	wl_pic2: {
		label: "Picture (2)",
		type: Object,
		blackbox: true,
		optional: true
	},
	wl_pic3: {
		label: "Picture (3)",
		type: Object,
		blackbox: true,
		optional: true
	},
	wl_rooms: {
		label: "Number of Rooms",
		type: Number,
		optional: true
	},
	wl_net_how: {
		label: "Internet (how)",
		type: String,
		optional: true
	},
	wl_notes: {
		label: "Notes",
		type: String,
		optional: true
	},
	wl_mgr_name: {
		label: "Mgr. Name",
		type: String,
		optional: true
	},
	wl_mgr_phone: {
		label: "Manager Phone",
		type: String,
		optional: true
	},
	wl_mgr_email: {
		label: "Mgr. Email",
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		optional: true
	},
	wl_mgr_facebook: {
		label: "Mgr. Facebook",
		type: String,
		optional: true
	},
	wl_mgr_gplus: {
		label: "Google+",
		type: String,
		optional: true
	},
	wl_website: {
		label: "Website",
		type: String,
		optional: true
	},
	wl_twitter: {
		label: "Twitter",
		type: String,
		optional: true
	},
	wl_mgr_twitter: {
		label: "Mgr. Twitter",
		type: String,
		optional: true
	},
	wl_open_time: {
		label: "Opening Time",
		type: Number,
		optional: true
	},
	wl_close_time: {
		label: "Closing Time",
		type: Number,
		optional: true
	},
	wl_power_src: {
		label: "Power Source",
		type: String,
		optional: true
	},
	wl_county: {
		label: "County",
		type: String,
		optional: true
	},
	wl_city: {
		label: "City",
		type: String,
		optional: true
	},
	wl_district: {
		label: "District",
		type: String,
		optional: true
	},
	wl_nearest_police: {
		label: "Nearest Police Station",
		type: String,
		optional: true
	},
	wl_police_phone: {
		label: "Police Phone No",
		type: String,
		optional: true
	},
	wl_police_ocpd_nm: {
		label: "OCPD Name",
		type: String,
		optional: true
	},
	wl_ocpd_phone: {
		label: "OCPD Phone",
		type: String,
		optional: true
	},
	wl_ocs_nm: {
		label: "OCS Name",
		type: String,
		optional: true
	},
	wl_ocs_phone: {
		label: "OCS Phone",
		type: String,
		optional: true
	},
	wl_comp_no: {
		label: "Number of Computers",
		type: Number,
		optional: true
	},
	wl_wifi: {
		label: "Has Wifi?",
		type: Boolean,
		optional: true
	},
	wl_ssid: {
		label: "Wifi SSID",
		type: String,
		optional: true
	},
	wl_wifi_passwd: {
		label: "Wifi Password",
		type: String,
		optional: true
	}
});

this.WorkLocs.attachSchema(this.Schemas.WorkLocs);
