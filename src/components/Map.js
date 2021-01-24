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

    const projection = d3.geoAlbersUsa();
    const path = d3.geoPath().projection(projection);

    svg
      .append("path")
      .datum(topojson.merge(us, us.objects.states.geometries))
      .attr("fill", "black")
      .attr("d", path);

    svg
      .append("path")
      .datum(topojson.mesh(us, us.objects.states, (a, b) => a !== b))
      .attr("fill", "none")
      .attr("stroke", "white")
      .attr("stroke-linejoin", "round")
      .attr("d", path);
      // eslint-disable-next-line
    const g = svg.append("g").attr("fill", "red").attr("stroke", "black");
  }
  render() {
    return (
      <div style={{ width: "75%", marginLeft: "auto", marginRight: "auto" }}>
        <svg ref={this.svg} viewBox="0 0 1000 1000"></svg>
      </div>
    );
  }
}
