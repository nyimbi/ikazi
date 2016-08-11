this.Earnings = new Mongo.Collection("earnings");

this.Earnings.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["customer","admin"]);
};

this.Earnings.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin"]);
};

this.Earnings.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin"]);
};

this.Schemas = this.Schemas || {};

this.Schemas.Earnings = new SimpleSchema({
	worker: {
		label: "Worker",
		type: String,
		optional: true
	},
	task: {
		label: "Task",
		type: String,
		optional: true
	},
	task_value: {
		label: "Task_value",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0,
		min: 0
	},
	task_date: {
		label: "Task_date",
		type: Date,
		optional: true
	},
	task_quality: {
		label: "Task_quality",
		type: Number,
		optional: true
	},
	task_accepted: {
		label: "Accepted",
		type: Boolean,
		optional: true
	}
});

this.Earnings.attachSchema(this.Schemas.Earnings);
