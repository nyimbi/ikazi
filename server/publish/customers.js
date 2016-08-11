Meteor.publish("customers", function() {
	if(Users.isInRoles(this.userId, ["admin","customer"])) {
		return Customers.find({}, {});
	}
	return this.ready();
});

Meteor.publish("customers_empty", function() {
	if(Users.isInRoles(this.userId, ["admin","customer"])) {
		return Customers.find({_id:null}, {});
	}
	return this.ready();
});

Meteor.publish("customers_selected", function(customerId) {
	if(Users.isInRoles(this.userId, ["admin","customer"])) {
		return Customers.find({_id:customerId}, {});
	}
	return this.ready();
});

