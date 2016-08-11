Meteor.publish("payments", function() {
	if(Users.isInRoles(this.userId, ["customer","worker","admin"])) {
		return Payments.publishJoinedCursors(Payments.find({}, {}));
	}
	return this.ready();
});

Meteor.publish("payments_empty", function() {
	if(Users.isInRoles(this.userId, ["customer","worker","admin"])) {
		return Payments.publishJoinedCursors(Payments.find({_id:null}, {}));
	}
	return this.ready();
});

Meteor.publish("payments_selected", function(customerId) {
	if(Users.isInRoles(this.userId, ["customer","worker","admin"])) {
		return Payments.publishJoinedCursors(Payments.find({_id:customerId}, {}));
	}
	return this.ready();
});

