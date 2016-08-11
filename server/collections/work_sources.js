WorkSources.allow({
	insert: function (userId, doc) {
		return WorkSources.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return WorkSources.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return WorkSources.userCanRemove(userId, doc);
	}
});

WorkSources.before.insert(function(userId, doc) {
	doc.createdAt = new Date();
	doc.createdBy = userId;
	doc.modifiedAt = doc.createdAt;
	doc.modifiedBy = doc.createdBy;

	
	if(!doc.createdBy) doc.createdBy = userId;
});

WorkSources.before.update(function(userId, doc, fieldNames, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	
});

WorkSources.before.upsert(function(userId, selector, modifier, options) {
	modifier.$set = modifier.$set || {};
	modifier.$set.modifiedAt = new Date();
	modifier.$set.modifiedBy = userId;

	/*BEFORE_UPSERT_CODE*/
});

WorkSources.before.remove(function(userId, doc) {
	
});

WorkSources.after.insert(function(userId, doc) {
	
});

WorkSources.after.update(function(userId, doc, fieldNames, modifier, options) {
	
});

WorkSources.after.remove(function(userId, doc) {
	
});
