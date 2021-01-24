import React, { Component } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.svg = React.createRef();
  }
  async componentDidMount() {
    let svg = d3.select(this.svg.current);

    const us = await d3.json(
      "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json"
    );
    us.objects.states = {
      type: "GeometryCollection",
      geometries: us.objects.states.geometries.filter(function (d) {
        return d.id < 60;
      }),
    };
  }
  render() {
    return (
      <div style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}>
        <svg ref={this.svg} viewBox="0 0 975 610"></svg>
      </div>
    );
  }
}
