this.Tasks = new Mongo.Collection("tasks");

this.Tasks.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["customer","admin","worker","agency"]);
};

this.Tasks.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin","worker","agency"]);
};

this.Tasks.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin"]);
};

this.Schemas = this.Schemas || {};

this.Schemas.Tasks = new SimpleSchema({
	task_guid: {
		label: "Task ID",
		type: String,
		optional: true
	},
	pj_id: {
		label: "Project ID",
		type: String,
		optional: true
	},
	task_seq: {
		label: "Sequence",
		type: Number,
		optional: true
	},
	task_name: {
		label: "Name",
		type: String,
		optional: true
	},
	task_data: {
		label: "Task Data",
		type: Object,
		blackbox: true,
		optional: true
	},
	task_data_type: {
		label: "Data Type",
		type: String,
		optional: true
	},
	task_start: {
		label: "Start Time",
		type: Number,
		optional: true
	},
	task_end: {
		label: "End Time",
		type: Number,
		optional: true
	},
	task_complete: {
		label: "Complete",
		type: Boolean,
		optional: true
	},
	task_in_process: {
		label: "In Process",
		type: Boolean,
		optional: true
	},
	task_assigned: {
		label: "Assigned",
		type: Boolean,
		optional: true
	},
	task_booked: {
		label: "Booked",
		type: Boolean,
		optional: true
	},
	task_worker: {
		label: "Worker",
		type: String,
		optional: true
	},
	task_output: {
		label: "Output",
		type: String,
		optional: true
	},
	task_quality: {
		label: "Quality",
		type: Number,
		optional: true,
		defaultValue: 0,
		min: 0,
		max: 10
	},
	task_rejected: {
		label: "Rejected",
		type: Boolean,
		optional: true
	},
	task_accepted: {
		label: "Accepted",
		type: Boolean,
		optional: true
	},
	task_under_review: {
		label: "Under Review",
		type: Boolean,
		optional: true
	},
	task_difficulty_rating: {
		label: "Difficulty Rating",
		type: Number,
		optional: true
	},
	task_grp: {
		label: "Task Group",
		type: String,
		optional: true
	},
	task_pj: {
		label: "Project",
		type: String,
		optional: true
	},
	task_value: {
		label: "Value",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0,
		min: 0
	},
	task_value_hi: {
		label: "Hi Value",
		type: Number,
		decimal: true,
		optional: true,
		defaultValue: 0,
		min: 0
	},
	task_value_lo: {
		label: "Lo Value",
		type: Number,
		decimal: true,
		optional: true
	},
	task_tags: {
		label: "Tags",
		type: String,
		optional: true
	},
	task_priority: {
		label: "Priority",
		type: Number,
		defaultValue: 0,
		min: 0,
		max: 20
	}
});

this.Tasks.attachSchema(this.Schemas.Tasks);
