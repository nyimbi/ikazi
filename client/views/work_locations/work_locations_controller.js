this.WorkLocationsController = RouteController.extend({
	template: "WorkLocations",
	

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
			Meteor.subscribe("work_locs")
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
			work_locs: WorkLocs.find({}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});