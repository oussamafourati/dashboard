import React from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import Countdown from "react-countdown";

// Import Images
import logoDark from "assets/images/logo-dark.png";
import logoLight from "assets/images/logo-light.png";
import comingsoon from "assets/images/develop-icon-20.jpg";
import { Link } from "react-router-dom";

const ComingSoon = () => {
  document.title = "Calendrier | Radhouani";

  const renderer = ({ days, hours, minutes, seconds, completed }: any) => {
    if (completed) {
      // Render a completed state
      return <span>You are good to go!</span>;
    } else {
      return (
        <>
          <div className="countdownlist">
            <div className="countdownlist-item">
              <div className="count-title">JOURS</div>
              <div className="count-num">{days}</div>
            </div>
            <div className="countdownlist-item">
              <div className="count-title">heures</div>
              <div className="count-num">{hours}</div>
            </div>
            <div className="countdownlist-item">
              <div className="count-title">Minutes</div>
              <div className="count-num">{minutes}</div>
            </div>
            <div className="countdownlist-item">
              <div className="count-title">Secondes</div>
              <div className="count-num">{seconds}</div>
            </div>
          </div>
        </>
      );
    }
  };

  return (
    <React.Fragment>
      <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
        <div className="w-100">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="auth-card mx-lg-3">
                  <Card className="border-0 mb-0">
                    <Card.Body className="text-center p-4">
                      <div className="text-center px-sm-5 mx-5">
                        <img src={comingsoon} alt="" height="110" />
                      </div>
                      <div className="mt-4 text-center pt-3">
                        <div className="position-relative">
                          <h4 className="fs-22 error-subtitle text-uppercase mb-0">
                            En Cours de développement
                          </h4>
                          <div>
                            <Row className="justify-content-center mt-5">
                              <Col lg={10}>
                                <Countdown
                                  date="2023/09/30"
                                  renderer={renderer}
                                />
                              </Col>
                            </Row>
                          </div>
                        </div>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
            </Row>
          </Container>

          <footer className="footer">
            <Container>
              <Row>
                <Col lg={12}>
                  <div className="text-center">
                    <p className="mb-0 text-muted">
                      ©{new Date().getFullYear()} © Radhouani.
                    </p>
                  </div>
                </Col>
              </Row>
            </Container>
          </footer>
        </div>
      </section>
    </React.Fragment>
  );
};

export default ComingSoon;
