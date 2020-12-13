import React from "react";
import CourseBought from "./CourseBought";
import DeviceTraffic from "./DeviceTraffic";
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
      <div className="row analysis-page">
        <div className="col-lg-4">
          <Stats />
        </div>
        <div className="col-lg-8">
          <Income />
        </div>
        <div className="col-lg-6">
          <CourseBought />
        </div>
        <div className="col-lg-6">
          <DeviceTraffic />
        </div>
        <div className="col-lg-12">
          <Traffic />
        </div>
      </div>
    );
  }
}

export default Anlaysis;
