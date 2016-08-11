this.Courses = new Mongo.Collection("courses");

this.Courses.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["admin","trainer"]);
};

this.Courses.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["trainer"]);
};

this.Courses.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["trainer","admin"]);
};

this.Schemas = this.Schemas || {};

this.Schemas.Courses = new SimpleSchema({
	course_name: {
		label: "Course Name",
		type: String
	},
	description: {
		label: "Course Description",
		type: String,
		optional: true
	},
	course_url: {
		label: "Link",
		type: String
	},
	course_units: {
		label: "Units",
		type: Number,
		defaultValue: 1,
		min: 1,
		max: 20
	},
	prereq: {
		label: "Prerequisites",
		type: String,
		optional: true
	},
	course_tags: {
		label: "Tags",
		type: String,
		optional: true
	}
});

this.Courses.attachSchema(this.Schemas.Courses);
