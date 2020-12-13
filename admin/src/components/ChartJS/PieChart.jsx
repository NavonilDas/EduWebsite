import React from "react";
import Chart from "chart.js";

class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.canvas = React.createRef();
    this.chart = null;
  }

  componentDidMount() {
    this.chart = new Chart(this.canvas.current, {
      type: "pie",
      data: {
        labels: this.props.labels || [],
        datasets: [
          {
            label: this.props.title || "",
            data: this.props.data || [],
            backgroundColor: this.props.backgroundColor || [
              "rgb(155, 205, 206,0.5)",
            ],
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
        }}
      />
    );
  }
}

export default PieChart;
