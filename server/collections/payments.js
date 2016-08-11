Payments.allow({
	insert: function (userId, doc) {
		return Payments.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Payments.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Payments.userCanRemove(userId, doc);
	}
});

Payments.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Payments.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Payments.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Payments.before.remove(function(userId, doc) {
	
});

Payments.after.insert(function(userId, doc) {
	
});

Payments.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Payments.after.remove(function(userId, doc) {
	
});
