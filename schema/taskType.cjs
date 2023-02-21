"use strict";

/*
 * Defined the Mongoose Schema and return a Model for a Task Type
 */

/* jshint node: true */

var mongoose = require("mongoose");

// create a schema
var taskTypeSchema = new mongoose.Schema({
  name: String, // Name of the task type.
  _class: String, // Class of the task type.
  color: String, // Color of the task type.
});

// the schema is useless so far
// we need to create a model using it
var TaskType = mongoose.model("taskType", taskTypeSchema);

// make this available to our users in our Node applications
module.exports = TaskType;
