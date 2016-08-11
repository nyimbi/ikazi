Earnings.allow({
	insert: function (userId, doc) {
		return Earnings.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return Earnings.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return Earnings.userCanRemove(userId, doc);
	}
});

Earnings.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

Earnings.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

Earnings.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

Earnings.before.remove(function(userId, doc) {
	
});

Earnings.after.insert(function(userId, doc) {
	
});

Earnings.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

Earnings.after.remove(function(userId, doc) {
	
});
