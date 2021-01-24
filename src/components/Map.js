import React, { Component } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.svg = React.createRef();
  }
  async componentDidMount() {
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(
      (us) => {
        var width = 500;
        var height = 500;

        let svg = d3
          .select(this.svg.current)
          .attr("viewBox", [0, 0, width, height])
          .on("click", reset);
        const projection = d3.geoAlbersUsa().translate([width / 2, height / 2]);
        const path = d3.geoPath().projection(projection);
        var g = svg.append("g");
        function reset() {
          states.transition().style("fill", null);
          svg
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity,
              d3.zoomTransform(svg.node()).invert([width / 2, height / 2])
            );
        }
        let states = g
          .append("g")
          .attr("id", "states")
          .selectAll("path")
          .data(topojson.feature(us, us.objects.states).features)
          .enter()
          .append("path")
          .attr("cursor", "pointer")
          .on("click", clicked)
          .attr("d", path);

        g.append("path")
          .datum(
            topojson.mesh(us, us.objects.states, function (a, b) {
              return a !== b;
            })
          )
          .attr("id", "state-borders")
          .attr("d", path);
        var zoom = d3
          .zoom()
          .scaleExtent([1, 10])
          .on("zoom", function (event) {
            g.selectAll("path").attr("transform", event.transform);
          });

        svg.call(zoom);
        function clicked(event, d) {
          const [[x0, y0], [x1, y1]] = path.bounds(d);
          event.stopPropagation();
          states.transition().style("fill", null);
          svg
            .transition()
            .duration(750)
            .call(
              zoom.transform,
              d3.zoomIdentity
                .translate(width / 2, height / 2)
                .scale(
                  Math.min(
                    8,
                    0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)
                  )
                )
                .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
              d3.pointer(event, svg.node())
            );
        }
      }
    );
  }
  render() {
    return (
      <div>
        <svg
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            display: "block",
          }}
          width={"75vw"}
          height={"75vh"}
          ref={this.svg}
        ></svg>
      </div>
    );
  }
}
