this.ProjectsEditController = RouteController.extend({
	template: "ProjectsEdit",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("projects_selected", this.params.customerId)
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
			projects_selected: Projects.findOne({_id:this.params.customerId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});