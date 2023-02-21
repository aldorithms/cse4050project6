/*
 * Load the model data of the problem 2 of CSE4050's project5.
 * We load into the property cse4050models.taskModel
 *
 */

const tasks = [
  { _id: "1", type_id: "1", description: "Study javascript" },
  { _id: "2", type_id: "2", description: "Study JSON" },
  { _id: "3", type_id: "3", description: "Study HTML" },
  { _id: "4", type_id: "3", description: "Study CSS" },
  { _id: "5", type_id: "2", description: "Study Material-UI" },
];

const taskTypes = [
  { _id: "1", name: "New", class: "new", color: "warning.main" },
  { _id: "2", name: "In Progress", class: "inprogress", color: "info.main" },
  { _id: "3", name: "Done", class: "done", color: "success.main" },
];

const taskListModel = () => {
  return tasks;
};

const taskTypeListModel = () => {
  return taskTypes;
};

const cse4050models = {
  taskListModel: taskListModel,
  taskTypeListModel: taskTypeListModel,
};

export default cse4050models;
