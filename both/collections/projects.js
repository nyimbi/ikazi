this.Projects = new Mongo.Collection("projects");

this.Projects.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["customer","admin"]);
};

this.Projects.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin","agency"]);
};

this.Projects.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin"]);
};

this.Schemas = this.Schemas || {};

this.Schemas.Projects = new SimpleSchema({
	pj_name: {
		label: "Project Name",
		type: String,
		optional: true
	},
	customerid: {
		type: String,
		optional: true
	},
	pj_start_date: {
		label: "Start Date",
		type: Date,
		optional: true
	},
	pj_due_date: {
		label: "Due Date",
		type: Date,
		optional: true
	},
	pj_priority: {
		label: "Priority",
		type: Number,
		optional: true
	},
	pj_brief: {
		label: "Brief",
		type: String,
		optional: true
	},
	pj_description: {
		label: "Description",
		type: String,
		optional: true
	},
	pj_skills: {
		label: "Skills Required",
		type: String,
		optional: true
	},
	pj_type: {
		label: "Project Type",
		type: String,
		optional: true
	},
	pj_task_count: {
		label: "Task Count",
		type: Number,
		optional: true
	},
	pj_tasks_complete: {
		label: "Tasks Complete",
		type: Boolean,
		optional: true
	},
	pj_tasks_pending: {
		label: "Tasks Pending",
		type: Number,
		optional: true
	},
	pj_budget: {
		label: "Budget",
		type: Number,
		decimal: true,
		optional: true
	}
});

this.Projects.attachSchema(this.Schemas.Projects);
