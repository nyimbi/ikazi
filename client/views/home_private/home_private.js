Template.HomePrivate.rendered = function() {
	
};

Template.HomePrivate.events({
	
});

Template.HomePrivate.helpers({
	
});

Template.HomePrivateHomePrivJumbotron.rendered = function() {
	
};

Template.HomePrivateHomePrivJumbotron.events({
	"click #jumbotron-button": function(e, t) {
		e.preventDefault();
		Router.go("tasks", {});
	}
	
});

Template.HomePrivateHomePrivJumbotron.helpers({
	
});
