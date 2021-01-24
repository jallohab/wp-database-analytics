import React, { Component } from "react";
import * as d3 from "d3";
import * as topojson from "topojson";
import DataCard from "./Card";
import LoadingOverlay from "react-loading-overlay";
import Fade from "react-reveal/Fade";
import Chart from "./BarChart";
import CaptionBar from "./CaptionBar";
import { Container, Row, Col } from "react-bootstrap";
import { sum } from "d3";
import SimpleLine from "./LineChart";

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
            database: database,
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
  cleanData = (database, age) => {
    let white = database.filter((ele) => {
      return ele.race === "W";
    });
    let black = database.filter((ele) => {
      return ele.race === "B";
    });
    let asian = database.filter((ele) => {
      return ele.race === "A";
    });
    let native_american = database.filter((ele) => {
      return ele.race === "N";
    });
    let other = database.filter((ele) => {
      return ele.race === "O";
    });
    let hispanic = database.filter((ele) => {
      return ele.race === "H";
    });

    let results = [];
    let young_adult = 0;

    for (const ele of white) {
      if (ele.age <= age) {
        young_adult++;
      }
    }

    results.push({
      name: "White",
      young_adult: Math.round(young_adult / 197),
    });
    young_adult = 0;

    for (const ele of black) {
      if (ele.age <= age) {
        young_adult++;
      }
    }

    results.push({
      name: "Black",
      young_adult: Math.round(young_adult / 42),
    });
    young_adult = 0;

    for (const ele of asian) {
      if (ele.age <= age) {
        young_adult++;
      }
    }

    results.push({
      name: "Asian",
      young_adult: Math.round(young_adult / 17),
    });
    young_adult = 0;

    for (const ele of other) {
      if (ele.age <= age) {
        young_adult++;
      }
    }

    results.push({
      name: "Other",
      young_adult: Math.round(young_adult / 49),
    });
    young_adult = 0;

    for (const ele of native_american) {
      if (ele.age <= age) {
        young_adult++;
      }
    }

    results.push({
      name: "Native American",
      young_adult: Math.round(young_adult / 4.9),
    });
    young_adult = 0;

    for (const ele of hispanic) {
      if (ele.age <= age) {
        young_adult++;
      }
    }

    results.push({
      name: "Hispanic",
      young_adult: Math.round(young_adult / 39),
    });
    young_adult = 0;
    return results;
  };
  newYorkStats = (database) => {
    let newYork = database.filter((ele) => {
      return ele.state === "NY";
    });
    let white = newYork.filter((ele) => {
      return ele.race === "W";
    });
    let black = newYork.filter((ele) => {
      return ele.race === "B";
    });
    let asian = newYork.filter((ele) => {
      return ele.race === "A";
    });
    let native_american = newYork.filter((ele) => {
      return ele.race === "N";
    });
    let other = newYork.filter((ele) => {
      return ele.race === "O";
    });
    let hispanic = newYork.filter((ele) => {
      return ele.race === "H";
    });

    let results = [];

    results.push({
      name: "White",
      killed: white.length,
    });
    results.push({
      name: "Black",
      killed: black.length,
    });
    results.push({
      name: "Asian",
      killed: asian.length,
    });
    results.push({
      name: "Native American",
      killed: native_american.length,
    });
    results.push({
      name: "Other",
      killed: other.length,
    });
    results.push({
      name: "Hispanic",
      killed: hispanic.length,
    });

    return results;
  };

  lineChart = (database, age) => {
    let white = database.filter((ele) => {
      return ele.race === "W";
    });
    let black = database.filter((ele) => {
      return ele.race === "B";
    });
    let other = database.filter((ele) => {
      return ele.race === "O";
    });
    let hispanic = database.filter((ele) => {
      return ele.race === "H";
    });

    let results = [
      {
        name: "2015",
        White: 500,
        Black: 259,
        Hispanic: 172,
        Other: 37,
      },
      {
        name: "2016",
        White: 469,
        Black: 234,
        Hispanic: 160,
        Other: 42,
      },
      {
        name: "2017",
        White: 461,
        Black: 224,
        Hispanic: 181,
        Other: 44,
      },
      {
        name: "2018",
        White: 456,
        Black: 229,
        Hispanic: 166,
        Other: 39,
      },
      {
        name: "2019",
        White: 405,
        Black: 249,
        Hispanic: 163,
        Other: 41,
      },
      {
        name: "2020",
        White: 436,
        Black: 226,
        Hispanic: 156,
        Other: 22,
      },
      {
        name: "2021",
        White: white.filter((x) => {
          return parseInt(x.date.substring(0, 4)) === 2021;
        }).length,
        Black: black.filter((x) => {
          return parseInt(x.date.substring(0, 4) === 2021);
        }).length,
        Hispanic: hispanic.filter((x) => {
          return parseInt(x.date.substring(0, 4)) === 2021;
        }).length,
        Other: other.filter((x) => {
          return parseInt(x.date.substring(0, 4)) === 2021;
        }).length,
      },
    ];
    return results;
  };

  render() {
    return (
      <LoadingOverlay
        active={this.state.loading}
        spinner
        text="Loading Data..."
      >
        <CaptionBar data={this.state.database}></CaptionBar>
        <div style={{ minHeight: "80vh" }}>
          <Fade clear>
            <div>
              <p className="map-caption">
                Data points of Police Shootings across the U.S. sourced from{" "}
                <a href="https://github.com/washingtonpost/data-police-shootings">
                  The Washington Post
                </a>
              </p>
              <p className="secondary-caption">
                Click or scroll to zoom, and hover over data points to populate
                the list to find out more.
              </p>
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
        <br></br>
        <br></br>
        <br></br>
        <div className="chart-styles">
          <Container>
            <Row>
              <Col xs={12} sm={12} md={6}>
                <Fade clear>
                  <Chart
                    data={this.cleanData(this.state.database, 25)}
                    bar={{ dataKey: "young_adult", name: "Young Adults" }}
                  ></Chart>
                  <p className="secondary-caption">
                    Per 1 Million People, Black and Hispanic young adults (under
                    the age of 25) are disproportionally killed by the police
                  </p>
                </Fade>
              </Col>
              <Col xs={12} sm={12} md={6}>
                <Fade clear>
                  <Chart
                    data={this.newYorkStats(this.state.database)}
                    bar={{ dataKey: "killed", name: "Killed In New York" }}
                  ></Chart>
                  <p className="secondary-caption">
                    Black and Hispanic members of the community are
                    disproportionally killed by the police in New York
                  </p>
                </Fade>
              </Col>

              <Col md={3}></Col>
              <Col xs={12} sm={12} md={6}>
                <div>
                  <Fade clear>
                    <Chart
                      data={this.cleanData(this.state.database, 18)}
                      bar={{ dataKey: "young_adult", name: "Minors Killed" }}
                    ></Chart>
                    <p className="secondary-caption">
                      Per 1 Million People, Black minors are 3x more likely to
                      be killed and Hispanic minors are 2x more likely to be
                      killed than their White counterparts
                    </p>
                  </Fade>
                </div>
              </Col>
            </Row>
            <br></br>
            <Row>
              <Col md={3}></Col>
              <Col xs={12} sm={12} md={6}>
                <div>
                  <Fade clear>
                    <SimpleLine
                      data={this.lineChart(this.state.database)}
                    ></SimpleLine>
                    <p className="secondary-caption">
                      There hasn't been significant change to the amount of
                      people killed by police per year eventhough many reforms
                      have been made
                    </p>
                  </Fade>
                </div>
              </Col>
            </Row>
          </Container>
        </div>
      </LoadingOverlay>
    );
  }
}
