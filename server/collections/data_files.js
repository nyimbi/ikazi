DataFiles.allow({
	insert: function (userId, doc) {
		return DataFiles.userCanInsert(userId, doc);
	},

	update: function (userId, doc, fields, modifier) {
		return DataFiles.userCanUpdate(userId, doc);
	},

	remove: function (userId, doc) {
		return DataFiles.userCanRemove(userId, doc);
	},

	download: function (userId, doc) {
		return DataFiles.userCanDownload(userId, doc);
	}
});
