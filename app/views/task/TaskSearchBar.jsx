import React from "react";
import TextField from "@mui/material/TextField";

class TaskSearchBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <TextField
        id="outlined-search"
        label="Search tasks"
        type="search"
        size="small"
        value={this.props.value}
        sx={{ float: "right" }}
      />
    );
  }
}

export default TaskSearchBar;
