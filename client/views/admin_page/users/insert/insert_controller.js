this.AdminPageUsersInsertController = RouteController.extend({
	template: "AdminPage",
	layoutTemplate: "AdminPageUsers",

	yieldTemplates: {
		'AdminPageUsersInsert': { to: 'AdminPageSubcontent'}
		
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("AdminPage"); this.render("loading", { to: "AdminPageSubcontent" });}
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("admin_users")
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			admin_users: Users.find({}, {}),
			users_null: Users.findOne({_id:null}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});