import React from "react";
import Chart from "chart.js";

class Line extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.chart = null;
    this.canvas = React.createRef();
  }

  componentDidMount() {
    this.chart = new Chart(this.canvas.current, {
      type: "line",
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
        }}
      />
    );
  }
}

export default Line;
