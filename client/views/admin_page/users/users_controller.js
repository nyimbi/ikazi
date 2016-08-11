this.AdminPageUsersController = RouteController.extend({
	template: "AdminPage",
	

	yieldTemplates: {
		'AdminPageUsers': { to: 'AdminPageSubcontent'}
		
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
			admin_users: Users.find({}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});