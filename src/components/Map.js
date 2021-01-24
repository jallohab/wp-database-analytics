import React, { Component } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import DataCard from "./Card";
import LoadingOverlay from "react-loading-overlay";
import Fade from "react-reveal/Fade";

export default class Map extends Component {
  constructor(props) {
    super(props);
    this.svg = React.createRef();
    this.state = {
      database: [],
      dict: new Set(),
      array: [],
      loading: true,
    };
  }
  async componentDidMount() {
    var self = this;
    d3.json("https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json").then(
      (us) => {
        var width = 750;
        var height = 750;

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
        const handleMouseOver = (d, i) => {
          if (this.state.dict.has(i.metadata) !== true) {
            let temp = this.state.dict;
            temp.add(i.metadata);
            let arr = this.state.array;
            if (this.state.array.length === 9) {
              arr.shift();
            }
            this.setState({
              dict: temp,
              array: [...arr, i.metadata],
            });
          }
        };

        var data = {
          type: "FeatureCollection",
          features: [],
        };
        d3.json(
          "https://immense-oasis-19068.herokuapp.com/https://www.washingtonpost.com/graphics/investigations/police-shootings-database/data/policeshootings_all.json"
        ).then((database) => {
          this.setState({
            loading: false,
          });
          for (const d of database) {
            if (d.lat !== null && d.lon !== null) {
              let feature = {
                type: "feature",
                geometry: {
                  type: "Point",
                  coordinates: [d.lat, d.lon],
                },
                metadata: {
                  blurb: d.blurb,
                  source1: d.sources[0],
                  source2: d.sources[1],
                  name: d.name,
                },
              };

              let temp = data.features;
              temp.push(feature);
              data.features = temp;
            }
          }
          svg
            .selectAll("circle")
            .data(data.features)
            .enter()
            .append("circle")
            .attr("cx", function (d) {
              var longitude = d.geometry.coordinates[1];
              var latitude = d.geometry.coordinates[0];
              return projection([longitude, latitude])[0];
            })
            .attr("cy", function (d) {
              var longitude = d.geometry.coordinates[1];
              var latitude = d.geometry.coordinates[0];
              return projection([longitude, latitude])[1];
            })
            .style("fill", "black")
            .attr("r", 0.5)
            .on("mouseover", handleMouseOver);
        });
        var zoom = d3
          .zoom()
          .scaleExtent([1, 50])
          .on("zoom", function (event) {
            svg.selectAll("circle").attr("transform", event.transform);
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
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text="Loading Data..."
      >
        <div style={{ minHeight: "100vh" }}>
          <Fade clear>
            <div>
              <svg
                style={{
                  marginLeft: "auto",
                  marginRight: "auto",
                  display: "block",
                }}
                width={"50vw"}
                height={"50vh"}
                ref={this.svg}
              ></svg>

              <br></br>
              <br></br>
            </div>
            <div>
              <DataCard data={this.state.array} />
            </div>
          </Fade>
        </div>
      </LoadingOverlay>
    );
  }
}
