this.Payments = new Mongo.Collection("payments");

this.Payments.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["customer","admin","trainer"]);
};

this.Payments.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin"]);
};

this.Payments.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["admin"]);
};

this.Schemas = this.Schemas || {};

this.Schemas.Payments = new SimpleSchema({
	pay_req_date: {
		label: "Pay_req_date",
		type: Date,
		optional: true
	},
	pay_req_amount: {
		label: "Pay_req_amount",
		type: Number,
		decimal: true,
		defaultValue: 0,
		min: 0
	},
	pay_req_story: {
		label: "Pay_req_story",
		type: String,
		optional: true
	},
	paid: {
		label: "Paid",
		type: Boolean,
		optional: true
	},
	debit: {
		label: "Debit",
		type: Number,
		decimal: true,
		optional: true
	},
	credit: {
		label: "Credit",
		type: Number,
		decimal: true,
		optional: true
	},
	paid_date: {
		label: "Paid_date",
		type: Date,
		optional: true
	},
	paid_how: {
		label: "Paid_how",
		type: String,
		optional: true
	},
	paid_to: {
		label: "Paid To",
		type: String,
		optional: true
	}
});

this.Payments.attachSchema(this.Schemas.Payments);
