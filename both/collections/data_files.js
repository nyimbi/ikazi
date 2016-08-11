this.DataFiles = new FS.Collection("data_files", {
	stores: [new FS.Store.GridFS("data_files", {})]
});

this.DataFiles.userCanInsert = function(userId, doc) {
	return Users.isInRoles(userId, ["customer","admin"]);
};

this.DataFiles.userCanUpdate = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin"]);
};

this.DataFiles.userCanRemove = function(userId, doc) {
	return userId && Users.isInRoles(userId, ["customer","admin"]);
};

this.DataFiles.userCanDownload = function(userId, doc) {
	return userId && (doc.file_owner == userId || Users.isInRoles(userId, ["customer","admin"]));
};
