import React from "react";
import CourseBought from "./CourseBought";
import Income from "./Income";
import Stats from "./Stats";
import Traffic from "./Traffic";

class Anlaysis extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div style={{}}>
        <CourseBought />
        <Income />
        <Traffic />
        <Stats />
      </div>
    );
  }
}

export default Anlaysis;
