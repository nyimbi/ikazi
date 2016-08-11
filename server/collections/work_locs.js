WorkLocs.allow({
	insert: function (userId, doc) {
		return WorkLocs.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WorkLocs.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WorkLocs.userCanRemove(userId, doc);
	}
});

WorkLocs.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

WorkLocs.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WorkLocs.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

WorkLocs.before.remove(function(userId, doc) {
	
});

WorkLocs.after.insert(function(userId, doc) {
	
});

WorkLocs.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WorkLocs.after.remove(function(userId, doc) {
	
});
