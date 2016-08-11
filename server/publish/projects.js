Meteor.publish("projects", function() {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","agency"])) {
		return Projects.publishJoinedCursors(Projects.find({}, {}));
	}
	return this.ready();
});

Meteor.publish("projects_empty", function() {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","agency"])) {
		return Projects.publishJoinedCursors(Projects.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("projects_selected", function(customerId) {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","agency"])) {
		return Projects.publishJoinedCursors(Projects.find({_id:customerId}, {}));
	}
	return this.ready();
});

