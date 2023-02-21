/* jshint node: true */

/*
 * This Node.js program loads the CSE4050 Project #5 model data into Mongoose defined objects
 * in a MongoDB database. It can be run with the command:
 *     node loadDatabase.js
 * be sure to have an instance of the MongoDB running on the localhost.
 *
 * This script loads the data into the MongoDB database named 'cse4050project6'.  In loads
 * into collections named User and Photos. The Comments are added in the Photos of the
 * comments. Any previous objects in those collections is discarded.
 *
 * NOTE: This scripts uses Promise abstraction for handling the async calls to
 * the database. We are not teaching Promises in CSE4050 so strongly suggest you don't
 * use them in your solution.
 *
 */

const config = require("dotenv").config();

// We use the Mongoose to define the schema stored in MongoDB.
var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

mongoose.connect(config.parsed.DB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Get the magic models we used in the previous projects.
var cse4050models = require("./modelData/kanbanApp.js").cse4050models;

// Load the Mongoose schema for Use and Photoid
var Task = require("./schema/task.js");
var TaskType = require("./schema/taskType.js");
var User = require("./schema/user.js");
var SchemaInfo = require("./schema/schemaInfo.js");

var versionString = "1.0";

// We start by removing anything that existing in the collections.
var removePromises = [
  Task.deleteMany({}),
  TaskType.deleteMany({}),
  User.deleteMany({}),
  SchemaInfo.deleteMany({}),
];

Promise.all(removePromises)
  .then(function () {
    // Load the users into the User. Mongo assigns ids to objects so we record
    // the assigned '_id' back into the cs142model.userListModels so we have it
    // later in the script.

    var taskTypeModels = cse4050models.taskTypeListModel();
    var mapFakeId2RealId = {};
    var taskTypePromises = taskTypeModels.map(function (taskType) {
      return TaskType.create({
        name: taskType.name, // Name of the task type.
        _class: taskType._class, // Class of the task type.
        color: taskType.color,
      })
        .then(function (taskTypeObj) {
          // Set the unique ID of the object. We use the MongoDB generated _id for now
          // but we keep it distinct from the MongoDB ID so we can go to something
          // prettier in the future since these show up in URLs, etc.

          mapFakeId2RealId[taskType._id] = taskTypeObj._id;
          taskType.objectID = taskTypeObj._id;
          taskTypeObj.save();
          console.log(
            "Adding task type:",
            taskType.name,
            " with ID ",
            taskType.objectID
          );
        })
        .catch(function (err) {
          console.error("Error create task type", err);
        });
    });

    var userModels = cse4050models.userListModel();
    var mapFakeId2RealIdUser = {}; // Map from fake id to real Mongo _id
    var userPromises = userModels.map(function (user) {
      return User.create({
        first_name: user.first_name,
        last_name: user.last_name,
        location: user.location,
        description: user.description,
        user_name: user.last_name.toLowerCase(),
        password: "weak",
      })
        .then(function (userObj) {
          // Set the unique ID of the object. We use the MongoDB generated _id for now
          // but we keep it distinct from the MongoDB ID so we can go to something
          // prettier in the future since these show up in URLs, etc.
          userObj.save();
          mapFakeId2RealIdUser[user._id] = userObj._id;
          user.objectID = userObj._id;
          console.log(
            "Adding user:",
            user.first_name + " " + user.last_name,
            " with ID ",
            user.objectID
          );
        })
        .catch(function (err) {
          console.error("Error create user", err);
        });
    });

    var allPromises = Promise.all(taskTypePromises.concat(userPromises)).then(
      function () {
        // Once we've loaded all the task types and users into the DB we add all the tasks. Note
        // that the user_id of the task is the MongoDB assigned id in the User object.
        var taskModels = cse4050models.taskListModel();
        var taskPromises = taskModels.map(function (task) {
          return Task.create({
            description: task.description,
            type_id: mapFakeId2RealId[task.type_id],
            user_id: mapFakeId2RealIdUser[task.user_id],
          })
            .then(function (taskObj) {
              task.objectID = taskObj._id;
              taskObj.save();
              console.log(
                "Adding task:",
                task.description,
                " of type ID ",
                taskObj.type_id
              );
            })
            .catch(function (err) {
              console.error("Error create task", err);
            });
        });

        return Promise.all(taskPromises).then(function () {
          // Create the SchemaInfo object
          return SchemaInfo.create({
            version: versionString,
          })
            .then(function (schemaInfo) {
              console.log(
                "SchemaInfo object created with version ",
                schemaInfo.version
              );
            })
            .catch(function (err) {
              console.error("Error create schemaInfo", err);
            });
        });
      }
    );

    allPromises.then(function () {
      mongoose.disconnect();
    });
  })
  .catch(function (err) {
    console.error("Error create schemaInfo", err);
  });
