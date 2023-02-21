import React, { useState } from "react";
import axios from "axios";
import TaskList from "./TaskList";


const Task = () => {
  const [tasksList, setTasksList] = useState([]);
  const [tasksTypesList, setTasksTypesList] = useState([]);

  useState(() => {
    axios.get("/api/tasks/").then((res) => {
      setTasksList(res.data);
    });
    axios.get("/api/task-types").then((res) => {
      setTasksTypesList(res.data);
    });
  }, [setTasksList.setTasksTypesList]);

  return (
    <div className="">
      <TaskList tasks={tasksList} types={tasksTypesList} />
    </div>
  );
};

export default Task;
