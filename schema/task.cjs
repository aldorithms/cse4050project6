"use strict";
/*
 *  Defined the Mongoose Schema and return a Model for a Task
 */
/* jshint node: true */

var mongoose = require("mongoose");

// create a schema
var taskSchema = new mongoose.Schema({
  type_id: mongoose.Schema.Types.ObjectId,
  user_id: mongoose.Schema.Types.ObjectId,
  description: String, // A brief task description
});

// the schema is useless so far
// we need to create a model using it
var Task = mongoose.model("Task", taskSchema);

// make this available to our users in our Node applications
module.exports = Task;
