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
                  <Card style={{ marginBottom: "20px" }}>
                    <Card.Body>
                      <Card.Title>
                        <center>{element.blurb}</center>
                      </Card.Title>
                      <Container>
                        <Row>
                          <Col>
                            {element.source1 !== undefined ? (
                              <Button
                                variant="primary"
                                href={element.source1.url}
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
