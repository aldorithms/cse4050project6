"use strict";

(function () {
  var tasks = [
    { _id: "1", type_id: "1", user_id: "1", description: "Study javascript" },
    { _id: "2", type_id: "2", user_id: "1", description: "Study JSON" },
    { _id: "3", type_id: "3", user_id: "1", description: "Study HTML" },
    { _id: "4", type_id: "3", user_id: "1", description: "Study CSS" },
    { _id: "5", type_id: "1", user_id: "2", description: "Study Material-UI" },
    { _id: "6", type_id: "2", user_id: "2", description: "Study Axios" },
  ];
  var taskTypes = [
    { _id: "1", name: "New", class: "new", color: "warning.main" },
    { _id: "2", name: "In Progress", class: "inprogress", color: "info.main" },
    { _id: "3", name: "Done", class: "done", color: "success.main" },
  ];

  var admin = {
    _id: "1",
    first_name: "Kanban",
    last_name: "Admin",
    location: "San Bernardino, CA",
    description: "System administrator",
  };

  var users = [admin];

  var taskListModel = function () {
    return tasks;
  };

  var taskTypeListModel = function () {
    return taskTypes;
  };

  var userListModel = function () {
    return users;
  };

  var cse4050models = {
    taskListModel: taskListModel,
    taskTypeListModel: taskTypeListModel,
    userListModel: userListModel,
  };

  if (typeof exports !== "undefined") {
    exports.cse4050models = cse4050models;
  } else {
    window.cse4050models = cse4050models;
  }
})();
