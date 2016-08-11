this.Customers = new Mongo.Collection("customers");

this.Customers.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["customer","admin"]);
};

this.Customers.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin"]);
};

this.Customers.userCanRemove = function(userId, doc) {
	return false;
};

this.Schemas = this.Schemas || {};

this.Schemas.Customers = new SimpleSchema({
	name: {
		label: "Name",
		type: String
	},
	tel_mob: {
		label: "Mobile",
		type: String,
		optional: true
	},
	tel_fixed: {
		label: "Telephone (Fixed)",
		type: String,
		optional: true
	},
	fax: {
		label: "Fax",
		type: String,
		optional: true
	},
	email: {
		label: "Email",
		type: String,
		regEx: SimpleSchema.RegEx.Email
	},
	contact_person: {
		label: "Contact Person",
		type: String,
		optional: true
	},
	phy_address: {
		label: "Physical Address",
		type: String,
		optional: true
	},
	postal_address: {
		label: "Postal Address",
		type: String,
		optional: true
	},
	website: {
		label: "Website",
		type: String,
		optional: true
	},
	notes: {
		label: "Notes",
		type: String,
		optional: true
	},
	paid_to_date: {
		label: "Paid To Date",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0,
		min: 0
	},
	reg_date: {
		label: "Registration Date",
		type: Date,
		optional: true
	}
});

this.Customers.attachSchema(this.Schemas.Customers);
