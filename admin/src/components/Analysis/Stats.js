import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "1",
      labels: [],
      title: "",
      data: "1000",
    };
  }
  componentDidMount() {}
  render() {
    return (
      <Paper className="analysis-paper">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <div>
            <Typography variant="h4" gutterBottom>
              Stats
            </Typography>

            <FormControl>
              <InputLabel id="stats-select-id">Select</InputLabel>
              <Select labelId="stats-select-id" value={this.state.selected}>
                <MenuItem value="1">Categories</MenuItem>
                <MenuItem value="2">Chapters</MenuItem>
                <MenuItem value="1">Courses</MenuItem>
                <MenuItem value="3">Users</MenuItem>
                <MenuItem value="4">Topics</MenuItem>
                <MenuItem value="5">Videos</MenuItem>
                <MenuItem value="6">Quizs</MenuItem>
                <MenuItem value="6">Questions</MenuItem>
              </Select>
            </FormControl>
          </div>

          <div style={{ display: "flex", margin: "16px" }}>
            <Typography variant="h4" gutterBottom style={{ margin: "auto" }}>
              {this.state.data}
            </Typography>
          </div>
        </div>
      </Paper>
    );
  }
}

export default Stats;
