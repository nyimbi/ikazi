Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

var publicRoutes = [
	"home_public",
	"login",
	"register",
	"forgot_password",
	"reset_password"
];

var privateRoutes = [
	"home_private",
	"customers",
	"customers.insert",
	"customers.edit",
	"projects",
	"projects.insert",
	"projects.edit",
	"tasks",
	"tasks.insert",
	"tasks.edit",
	"earning",
	"earning.insert",
	"earning.edit",
	"payments",
	"payments.insert",
	"payments.edit",
	"work_locations",
	"work_locations.insert",
	"work_locations.edit",
	"about",
	"user_settings",
	"user_settings.profile",
	"user_settings.profile.social_prof",
	"user_settings.profile.contact",
	"user_settings.profile.edu_prof",
	"user_settings.profile.bio_prof",
	"user_settings.change_pass",
	"logout",
	"admin_page",
	"admin_page.users",
	"admin_page.users.details",
	"admin_page.users.insert",
	"admin_page.users.edit",
	"admin_page.collections_page",
	"admin_page.banks_page",
	"admin_page.scripts_page",
	"admin_page.params_page"
];

var freeRoutes = [
	
];

var roleMap = [
	{ route: "customers",	roles: ["admin","customer"] },
	{ route: "customers.insert",	roles: ["admin","customer"] },
	{ route: "customers.edit",	roles: ["admin","customer"] },
	{ route: "projects",	roles: ["admin","customer"] },
	{ route: "projects.insert",	roles: ["admin","customer"] },
	{ route: "projects.edit",	roles: ["admin","customer"] },
	{ route: "tasks",	roles: ["admin","worker","trainer","customer"] },
	{ route: "tasks.insert",	roles: ["admin","worker","trainer","customer"] },
	{ route: "tasks.edit",	roles: ["admin","worker","trainer","customer"] },
	{ route: "earning",	roles: ["worker","admin","customer"] },
	{ route: "earning.insert",	roles: ["worker","admin","customer"] },
	{ route: "earning.edit",	roles: ["worker","admin","customer"] },
	{ route: "payments",	roles: ["customer","worker","admin"] },
	{ route: "payments.insert",	roles: ["customer","worker","admin"] },
	{ route: "payments.edit",	roles: ["customer","worker","admin"] },
	{ route: "work_locations",	roles: ["admin","worker","trainer","customer"] },
	{ route: "work_locations.insert",	roles: ["admin","worker","trainer","customer"] },
	{ route: "work_locations.edit",	roles: ["admin","worker","trainer","customer"] },
	{ route: "admin_page",	roles: ["admin"] },
	{ route: "admin_page.users",	roles: ["admin"] },
	{ route: "admin_page.users.details",	roles: ["admin"] },
	{ route: "admin_page.users.insert",	roles: ["admin"] },
	{ route: "admin_page.users.edit",	roles: ["admin"] },
	{ route: "admin_page.collections_page",	roles: ["admin"] },
	{ route: "admin_page.banks_page",	roles: ["admin"] },
	{ route: "admin_page.scripts_page",	roles: ["admin"] },
	{ route: "admin_page.params_page",	roles: ["admin"] }
];

this.firstGrantedRoute = function(preferredRoute) {
	if(preferredRoute && routeGranted(preferredRoute)) return preferredRoute;

	var grantedRoute = "";

	_.every(privateRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(publicRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	_.every(freeRoutes, function(route) {
		if(routeGranted(route)) {
			grantedRoute = route;
			return false;
		}
		return true;
	});
	if(grantedRoute) return grantedRoute;

	if(!grantedRoute) {
		// what to do?
		console.log("All routes are restricted for current user.");
	}

	return "";
}

// this function returns true if user is in role allowed to access given route
this.routeGranted = function(routeName) {
	if(!routeName) {
		// route without name - enable access (?)
		return true;
	}

	if(!roleMap || roleMap.length === 0) {
		// this app don't have role map - enable access
		return true;
	}

	var roleMapItem = _.find(roleMap, function(roleItem) { return roleItem.route == routeName; });
	if(!roleMapItem) {
		// page is not restricted
		return true;
	}

	if(!Meteor.user() || !Meteor.user().roles) {
		// user is not logged in
		return false;
	}

	// this page is restricted to some role(s), check if user is in one of allowedRoles
	var allowedRoles = roleMapItem.roles;
	var granted = _.intersection(allowedRoles, Meteor.user().roles);
	if(!granted || granted.length === 0) {
		return false;
	}

	return true;
};

Router.ensureLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!Meteor.userId()) {
		// user is not logged in - redirect to public home
		var redirectRoute = firstGrantedRoute("home_public");
		this.redirect(redirectRoute);
	} else {
		// user is logged in - check role
		if(!routeGranted(this.route.getName())) {
			// user is not in allowedRoles - redirect to first granted route
			var redirectRoute = firstGrantedRoute("home_private");
			this.redirect(redirectRoute);
		} else {
			this.next();
		}
	}
};

Router.ensureNotLogged = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(Meteor.userId()) {
		var redirectRoute = firstGrantedRoute("home_private");
		this.redirect(redirectRoute);
	}
	else {
		this.next();
	}
};

// called for pages in free zone - some of pages can be restricted
Router.ensureGranted = function() {
	if(Meteor.userId() && (!Meteor.user() || !Meteor.user().roles)) {
		this.render('loading');
		return;
	}

	if(!routeGranted(this.route.getName())) {
		// user is not in allowedRoles - redirect to first granted route
		var redirectRoute = firstGrantedRoute("");
		this.redirect(redirectRoute);
	} else {
		this.next();
	}
};

Router.waitOn(function() { 
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {
	
	this.route("home_public", {path: "/", controller: "HomePublicController"});
	this.route("login", {path: "/login", controller: "LoginController"});
	this.route("register", {path: "/register", controller: "RegisterController"});
	this.route("forgot_password", {path: "/forgot_password", controller: "ForgotPasswordController"});
	this.route("reset_password", {path: "/reset_password/:resetPasswordToken", controller: "ResetPasswordController"});
	this.route("home_private", {path: "/home_private", controller: "HomePrivateController"});
	this.route("customers", {path: "/customers", controller: "CustomersController"});
	this.route("customers.insert", {path: "/customers/insert", controller: "CustomersInsertController"});
	this.route("customers.edit", {path: "/customers/edit/:customerId", controller: "CustomersEditController"});
	this.route("projects", {path: "/projects", controller: "ProjectsController"});
	this.route("projects.insert", {path: "/projects/insert", controller: "ProjectsInsertController"});
	this.route("projects.edit", {path: "/projects/edit/:customerId", controller: "ProjectsEditController"});
	this.route("tasks", {path: "/tasks", controller: "TasksController"});
	this.route("tasks.insert", {path: "/tasks/insert", controller: "TasksInsertController"});
	this.route("tasks.edit", {path: "/tasks/edit/:customerId", controller: "TasksEditController"});
	this.route("earning", {path: "/earning", controller: "EarningController"});
	this.route("earning.insert", {path: "/earning/insert", controller: "EarningInsertController"});
	this.route("earning.edit", {path: "/earning/edit/:customerId", controller: "EarningEditController"});
	this.route("payments", {path: "/payments", controller: "PaymentsController"});
	this.route("payments.insert", {path: "/payments/insert", controller: "PaymentsInsertController"});
	this.route("payments.edit", {path: "/payments/edit/:customerId", controller: "PaymentsEditController"});
	this.route("work_locations", {path: "/work_locations", controller: "WorkLocationsController"});
	this.route("work_locations.insert", {path: "/work_locations/insert", controller: "WorkLocationsInsertController"});
	this.route("work_locations.edit", {path: "/work_locations/edit/:customerId", controller: "WorkLocationsEditController"});
	this.route("about", {path: "/about", controller: "AboutController"});
	this.route("user_settings", {path: "/user_settings", controller: "UserSettingsController"});
	this.route("user_settings.profile", {path: "/user_settings/profile", controller: "UserSettingsProfileController"});
	this.route("user_settings.profile.social_prof", {path: "/user_settings/profile/social_prof", controller: "UserSettingsProfileSocialProfController"});
	this.route("user_settings.profile.contact", {path: "/user_settings/profile/contact", controller: "UserSettingsProfileContactController"});
	this.route("user_settings.profile.edu_prof", {path: "/user_settings/profile/edu_prof", controller: "UserSettingsProfileEduProfController"});
	this.route("user_settings.profile.bio_prof", {path: "/user_settings/profile/bio_prof", controller: "UserSettingsProfileBioProfController"});
	this.route("user_settings.change_pass", {path: "/user_settings/change_pass", controller: "UserSettingsChangePassController"});
	this.route("logout", {path: "/logout", controller: "LogoutController"});
	this.route("admin_page", {path: "/admin_page", controller: "AdminPageController"});
	this.route("admin_page.users", {path: "/admin_page/users", controller: "AdminPageUsersController"});
	this.route("admin_page.users.details", {path: "/admin_page/users/details/:userId", controller: "AdminPageUsersDetailsController"});
	this.route("admin_page.users.insert", {path: "/admin_page/users/insert", controller: "AdminPageUsersInsertController"});
	this.route("admin_page.users.edit", {path: "/admin_page/users/edit/:userId", controller: "AdminPageUsersEditController"});
	this.route("admin_page.collections_page", {path: "/admin_page/collections_page", controller: "AdminPageCollectionsPageController"});
	this.route("admin_page.banks_page", {path: "/admin_page/banks_page", controller: "AdminPageBanksPageController"});
	this.route("admin_page.scripts_page", {path: "/admin_page/scripts_page", controller: "AdminPageScriptsPageController"});
	this.route("admin_page.params_page", {path: "/admin_page/params_page", controller: "AdminPageParamsPageController"});
});
