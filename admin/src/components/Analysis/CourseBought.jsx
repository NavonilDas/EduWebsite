import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import React from "react";
import BarChart from "../ChartJS/BarChart";

import axios from "axios";
import { HOST, errorHandler } from "../../Api";

class CourseBought extends React.Component {
  static weeks = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      title: "",
      selected: "10",
      data: [],
    };

    this.getData = this.getData.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.selected);
  }

  getData(value) {
    const date = new Date();
    const options = {
      withCredentials: true,
    };

    const time = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    let request = null;

    if (value === "20") {
      request = axios.get(`${HOST}analysis/monthly?time=${time}`, options);
    } else if (value === "30") {
      request = axios.get(`${HOST}analysis/yearly?time=${time}`, options);
    } else {
      request = axios.get(`${HOST}analysis/weekly?time=${time}`, options);
    }

    request
      .then((res) => {
        this.setState({
          data: res.data.data,
          title: res.data.title,
          labels: res.data.labels,
        });
      })
      .catch((err) => errorHandler(err, this));
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ selected: value, labels: [] });
    this.getData(value);
  }

  render() {
    return (
      <Paper className="analysis-paper">
        <Typography variant="h4" gutterBottom>
          Course Bought
        </Typography>

        <FormControl>
          <InputLabel id="course-bought-select-id">Select</InputLabel>
          <Select
            labelId="course-bought-select-id"
            value={this.state.selected}
            onChange={this.onChange}
          >
            <MenuItem value="10">Weekly</MenuItem>
            <MenuItem value="20">Montly</MenuItem>
            <MenuItem value="30">Yearly</MenuItem>
          </Select>
        </FormControl>

        {this.state.labels.length > 0 ? (
          <BarChart
            title={this.state.title}
            labels={this.state.labels}
            data={this.state.data}
          />
        ) : (
          ""
        )}
      </Paper>
    );
  }
}

export default CourseBought;
