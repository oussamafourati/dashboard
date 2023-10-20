import React from "react";
import { Card, Col, Container, Row, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
//img
import logolight from "assets/images/logo-light.png";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import authAnimation from "../../assets/images/logout.json";
import { useRef } from "react";

const Logout = () => {
  const lottieRef = useRef<LottieRefCurrentProps>(null);
  return (
    <React.Fragment>
      <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
        <div className="auth-header position-fixed top-0 start-0 end-0">
          <Container fluid>
            <Row className="justify-content-center align-items-center">
              <Col xs={2}>
                <Image src={logolight} alt="logo light" height={58} />
              </Col>
              {/*-end col*/}
            </Row>
            {/*end row*/}
          </Container>
          {/*end container-fluid*/}
        </div>
        <div className="w-100">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="auth-card mx-lg-3">
                  <Card className="border-0 mb-0">
                    <Card.Header className="bg-primary border-0">
                      <Row className="justify-content-center">
                        <Lottie
                          lottieRef={lottieRef}
                          onComplete={() => {
                            lottieRef.current?.goToAndPlay(30, true);
                          }}
                          animationData={authAnimation}
                          loop={false}
                          style={{ width: 380 }}
                        />
                      </Row>
                    </Card.Header>
                    <Card.Body className="text-center">
                      <p className="text-muted fs-24">
                        Vous êtes déconnecté !!
                      </p>
                      <div>
                        <Link
                          to="/login"
                          className="btn btn-primary w-100 fs-20"
                        >
                          Se connecter
                        </Link>
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </Col>
              {/*end col*/}
            </Row>
            {/*end row*/}
          </Container>
          {/*end container*/}
          <footer className="footer">
            <Container>
              <Row>
                <Col lg={12}>
                  <div className="text-center">
                    <p className="mb-0 text-muted">
                      {new Date().getFullYear()} Radhouani. © Réaliser par 3S
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
export default Logout;
