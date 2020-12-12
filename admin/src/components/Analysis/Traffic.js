import React from "react";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";

import Line from "../ChartJS/Line";

import axios from "axios";
import API, { errorHandler } from "../../Api";
const { HOST } = API;

class Traffic extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      labels: [],
      title: "",
      selected: "1",
      data: [],
      total: 0,
    };

    this.getData = this.getData.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  getData(value) {
    const date = new Date();
    const options = {
      withCredentials: true,
    };

    const time = `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`;

    let request = null;

    if (value === "1") {
      request = axios.get(
        `${HOST}analysis/traffic/weekly?time=${time}`,
        options
      );
    } else if (value === "2") {
      request = axios.get(
        `${HOST}analysis/traffic/monthly?time=${time}`,
        options
      );
    } else {
      request = axios.get(
        `${HOST}analysis/traffic/yearly?time=${time}`,
        options
      );
    }

    request
      .then((res) => {
        this.setState({
          total: res.data.total,
          data: res.data.data,
          title: res.data.title,
          labels: res.data.labels,
        });
      })
      .catch((err) => errorHandler(err, this));
  }

  componentDidMount() {
    this.getData(this.state.selected);
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ selected: value, labels: [] });
    this.getData(value);
  }

  render() {
    return (
      <Paper className="analysis-paper">
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h4" gutterBottom>
            Traffic
          </Typography>
          <div style={{ display: "flex" }}>
            <Typography
              variant="h5"
              gutterBottom
              style={{ margin: "auto", marginLeft: "11px" }}
            >
              {this.state.total}
            </Typography>
          </div>
        </div>

        <FormControl>
          <InputLabel id="income-select-id">Select</InputLabel>
          <Select
            labelId="income-select-id"
            value={this.state.selected}
            onChange={this.onChange}
          >
            <MenuItem value="1">Weekly</MenuItem>
            <MenuItem value="2">Montly</MenuItem>
            <MenuItem value="3">Yearly</MenuItem>
          </Select>
        </FormControl>

        {this.state.labels.length > 0 ? (
          <Line
            width="450px"
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

export default Traffic;
