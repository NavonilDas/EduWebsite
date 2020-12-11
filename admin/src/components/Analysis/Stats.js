import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";

import axios from "axios";
import API, { errorHandler } from "../../Api";
const { HOST } = API;

class Stats extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: "1",
      labels: [],
      title: "",
      data: "",
    };

    this.getCounts = this.getCounts.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ selected: value, data: "" });
    this.getCounts(value);
  }

  getCounts(value) {
    let request = null;
    const options = {
      withCredentials: true,
    };

    if (value === "2") {
      request = axios.get(`${HOST}chapters/analysis/count`, options);
    } else if (value === "3") {
      request = axios.get(`${HOST}courses/analysis/count`, options);
    } else if (value === "4") {
      request = axios.get(`${HOST}users/analysis/count`, options);
    } else if (value === "5") {
      request = axios.get(`${HOST}topics/analysis/count`, options);
    } else if (value === "6") {
      request = axios.get(`${HOST}videos/analysis/count`, options);
    } else if (value === "7") {
      request = axios.get(`${HOST}test/analysis/count`, options);
    } else if (value === "8") {
      request = axios.get(`${HOST}test/analysis/questions/count`, options);
    } else {
      request = axios.get(`${HOST}categories/analysis/count`, options);
    }
    request
      .then((res) => {
        if (res.data.count) {
          this.setState({
            data: res.data.count,
          });
        }
      })
      .catch((err) => errorHandler(err, this));
  }

  componentDidMount() {
    this.getCounts(this.state.selected);
  }

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
              <Select
                labelId="stats-select-id"
                value={this.state.selected}
                onChange={this.onChange}
              >
                <MenuItem value="1">Categories</MenuItem>
                <MenuItem value="2">Chapters</MenuItem>
                <MenuItem value="3">Courses</MenuItem>
                <MenuItem value="4">Users</MenuItem>
                <MenuItem value="5">Topics</MenuItem>
                <MenuItem value="6">Videos</MenuItem>
                <MenuItem value="7">Quizs</MenuItem>
                <MenuItem value="8">Questions</MenuItem>
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
