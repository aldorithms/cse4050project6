import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";

import TaskSearchBar from "./TaskSearchBar";

/**
 * Define TaskList, a React componment of CS4050 project #5.
 */
class TaskList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputLetters: "",
    };
  }

  handledragover = (event) => {
    event.preventDefault();
  };

  handledrop = (event) => {
    event.preventDefault();
    var task_id = event.dataTransfer.getData("task_id");
    if (event.target.classList.contains("cse4050-task-list")) {
      event.target.appendChild(document.getElementById(task_id));
    }
  };

  handledrag = (event) => {
    event.dataTransfer.setData("task_id", event.target.attributes.id.value);
  };

  render() {
    return (
      <Container disableGutters maxWidth="false" sx={{ px: 1, py: 1 }}>
        <TaskSearchBar value={this.state.inputLetters} />
        <Container disableGutters maxWidth="ld" component="main">
          <Grid container spacing={2} alignItems="flex-end">
            {this.props.types?.map((type) => (
              <Grid
                item
                xs={12}
                md={4}
                key={type.name + "-tasks"}
                className="new-tasks"
              >
                <Card variant="outlined" sx={{ borderRadius: 0, mb: 1 }}>
                  <Typography sx={{ px: 2, py: 1, fontWeight: 500 }}>
                    {type.name}
                  </Typography>
                </Card>
                <Stack
                  id={type.name + "-tasks-stack"}
                  type_id={type._id}
                  droppable="true"
                  onDragOver={this.handledragover}
                  onDrop={this.handledrop}
                  spacing={1}
                  className="cse4050-task-list"
                  sx={{
                    height: 600,
                  }}
                >
                  {this.props.tasks
                    ?.filter((task) => task.type_id === type._id)
                    .map((task) => {
                      return (
                        <Card
                          key={"task" + task._id}
                          id={"task" + task._id}
                          draggable="true"
                          droppable="false"
                          onDragStart={this.handledrag}
                          variant="outlined"
                          sx={{ borderLeft: "3px solid" }}
                          className="cse4050-task-task"
                        >
                          <CardContent>
                            <Typography>{task.description}</Typography>
                          </CardContent>
                        </Card>
                      );
                    })}
                </Stack>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Container>
    );
  }
}

export default TaskList;
