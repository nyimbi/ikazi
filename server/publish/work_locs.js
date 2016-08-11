Meteor.publish("work_locs", function() {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","trainer"])) {
		return WorkLocs.find({}, {});
	}
	return this.ready();
});

Meteor.publish("work_locs_empty", function() {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","trainer"])) {
		return WorkLocs.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("work_locs_selected", function(customerId) {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","trainer"])) {
		return WorkLocs.find({_id:customerId}, {});
	}
	return this.ready();
});

