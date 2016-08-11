// Projects
Projects.join(Customers, "customerid", "customer", ["name"]);

// Tasks
Tasks.join(Projects, "pj_id", "project", ["pj_name", "pj_brief"]);
Tasks.join(Users, "task_worker", "userid", ["profile.name", "email"]);
Tasks.join(Projects, "task_pj", "pj_name", ["pj_name", "pj_brief"]);

// Earnings
Earnings.join(Users, "worker", "userid", ["name"]);
Earnings.join(Tasks, "task", "task_id", ["task_guid", "task_start", "task_end", "task_complete", "task_value"]);

// Payments
Payments.join(Users, "paid_to", "name", ["profile.name", "profile.email"]);

