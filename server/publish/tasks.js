Meteor.publish("tasks", function() {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","trainer","agency"])) {
		return Tasks.publishJoinedCursors(Tasks.find({}, {}));
	}
	return this.ready();
});

Meteor.publish("tasks_empty", function() {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","trainer","agency"])) {
		return Tasks.publishJoinedCursors(Tasks.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("tasks_selected", function(customerId) {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","trainer","agency"])) {
		return Tasks.publishJoinedCursors(Tasks.find({_id:customerId}, {}));
	}
	return this.ready();
});

