import React from "react";
import { Card, Container, Row, Col, Button } from "react-bootstrap";
import Fade from "react-reveal/Fade";

export default function DataCard({ data }) {
  return (
    <div
      style={{ marginLeft: "auto", marginRight: "auto", alignItems: "center" }}
    >
      <Container>
        <Row>
          {data.map((element, index) => {
            return (
              <Col xs={4}>
                <Fade bottom>
                  <Card className="card">
                    <Card.Body>
                      <Card.Title>
                        <center>{element.name}</center>
                      </Card.Title>
                      <Card.Text>
                        <center>{element.blurb}</center>
                      </Card.Text>
                      <Container>
                        <Row>
                          <Col>
                            {element.source1 !== undefined ? (
                              <Button
                                variant="primary"
                                href={element.source1.url}
                                className="button"
                              >
                                Source 1
                              </Button>
                            ) : (
                              ""
                            )}
                          </Col>
                          <Col>
                            {element.source2 !== undefined ? (
                              <Button
                                variant="primary"
                                href={element.source1.url}
                                className="button"
                              >
                                Source 2
                              </Button>
                            ) : (
                              ""
                            )}
                          </Col>
                        </Row>
                      </Container>
                    </Card.Body>
                  </Card>
                </Fade>
              </Col>
            );
          })}
        </Row>
      </Container>
    </div>
  );
}
