this.AdminPageUsersDetailsController = RouteController.extend({
	template: "AdminPage",
	

	yieldTemplates: {
		'AdminPageUsersDetails': { to: 'AdminPageSubcontent'}
		
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
			Meteor.subscribe("admin_user", this.params.userId)
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
			admin_user: Users.findOne({_id:this.params.userId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});