import Task from "../../schema/task.cjs";
import TaskType from "../../schema/taskType.cjs";

export const getTask = async (request, response) => {
  const query = Task.find({}, "");
  const res = await query.exec();
  response.send(res);
};

export const getType = async (request, response) => {
  const query = TaskType.find({}, "");
  const res = await query.exec();
  response.send(res);
}; 
