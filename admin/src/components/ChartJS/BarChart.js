import React from "react";
import Chart from "chart.js";

class BarChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvas = React.createRef();
    this.chart = null;
  }

  componentDidMount() {
    this.chart = new Chart(this.canvas.current, {
      type: "bar",
      data: {
        labels: this.props.labels || [],
        datasets: [
          {
            label: this.props.title || "",
            data: this.props.data || [],
            backgroundColor:
              this.props.backgroundColor || "rgb(155, 205, 206,0.5)",
            borderColor: this.props.borderColor || "rgb(155, 205, 206)",
            borderWidth: this.props.borderWidth || 1,
          },
        ],
      },
    });
  }

  render() {
    return (
      <canvas
        ref={this.canvas}
        style={{
          height: this.props.height || "300px",
          width: this.props.width || "300px",
        }}
      />
    );
  }
}

export default BarChart;
