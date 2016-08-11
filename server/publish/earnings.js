Meteor.publish("earnings", function() {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","trainer"])) {
		return Earnings.publishJoinedCursors(Earnings.find({}, {}));
	}
	return this.ready();
});

Meteor.publish("earnings_empty", function() {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","trainer"])) {
		return Earnings.publishJoinedCursors(Earnings.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("earnings_selected", function(customerId) {
	if(Users.isInRoles(this.userId, ["customer","admin","worker","trainer"])) {
		return Earnings.publishJoinedCursors(Earnings.find({_id:customerId}, {}));
	}
	return this.ready();
});

