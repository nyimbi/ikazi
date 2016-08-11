this.WorkSources = new Mongo.Collection("work_sources");

this.WorkSources.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin"]);
};

this.WorkSources.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};

this.WorkSources.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};

this.Schemas = this.Schemas || {};

this.Schemas.WorkSources = new SimpleSchema({
	ws_name: {
		label: "Work Source Name",
		type: String,
		optional: true
	},
	ws_website: {
		label: "Website",
		type: String,
		optional: true
	},
	ws_federated_login: {
		label: "Has Federated Login",
		type: Boolean,
		optional: true
	},
	ws_contact_person: {
		label: "Contact Person",
		type: String,
		optional: true
	},
	ws_contact_email: {
		label: "Contact Email",
		type: String,
		regEx: SimpleSchema.RegEx.Email,
		optional: true
	},
	ws_contact_phone: {
		label: "Contact Phone",
		type: String,
		optional: true
	},
	ws_admin_name: {
		label: "Admin Name",
		type: String,
		optional: true
	},
	ws_onboard_date: {
		label: "Onboarding Date",
		type: Date,
		optional: true
	},
	ws_onboard_notes: {
		label: "Onboarding Notes",
		type: String,
		optional: true
	},
	ws_api_key: {
		label: "Ws_api_key",
		type: String,
		optional: true
	},
	ws_api_key2: {
		label: "Ws_api_key2",
		type: String,
		optional: true
	},
	ws_api_key3: {
		label: "Ws_api_key3",
		type: String,
		optional: true
	},
	ws_secret: {
		label: "Ws_secret",
		type: String,
		optional: true
	},
	ws_notes: {
		label: "Notes",
		type: String,
		optional: true
	},
	ws_tags: {
		label: "Tags",
		type: String,
		optional: true
	}
});

this.WorkSources.attachSchema(this.Schemas.WorkSources);
