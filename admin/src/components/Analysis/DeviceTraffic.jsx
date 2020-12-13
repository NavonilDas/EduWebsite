import React from "react";

import {
  FormControl,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@material-ui/core";
import PieChart from "../ChartJS/PieChart";

import axios from "axios";
import API, { errorHandler } from "../../Api";
const { HOST } = API;

class DeviceTraffic extends React.Component {
  static bgColors = ["#ff3d67", "#059bff", "#ffc233"];

  constructor(props) {
    super(props);
    this.state = {
      labels: ["Web", "Android", "Ios"],
      title: "",
      selected: "1",
      data: [],
    };
    this.getData = this.getData.bind(this);
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    this.getData(this.state.selected);
  }

  getData(value) {
  }

  onChange(event) {
    const { value } = event.target;
    this.setState({ selected: value, data: [] });
    this.getData(value);
  }

  render() {
    return (
      <Paper className="analysis-paper">
        <Typography variant="h4" gutterBottom>
          Device Traffic
        </Typography>

        <FormControl>
          <InputLabel id="device-traffic-select-id">Select</InputLabel>
          <Select
            labelId="device-traffic-select-id"
            value={this.state.selected}
            onChange={this.onChange}
          >
            <MenuItem value="1">This Week</MenuItem>
            <MenuItem value="2">This Month</MenuItem>
            <MenuItem value="3">This Year</MenuItem>
          </Select>
        </FormControl>

        {this.state.data.length > 0 ? (
          <PieChart
            width="450px"
            title={this.state.title}
            labels={this.state.labels}
            data={this.state.data}
            backgroundColor={DeviceTraffic.bgColors}
          />
        ) : (
          ""
        )}
      </Paper>
    );
  }
}

export default DeviceTraffic;
