import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

// Import Images
import logoDark from "assets/images/logo-dark.png";
import logoLight from "assets/images/logo-light.png";
import logo from "assets/images/auth/logo.jpg";
import { Link, useNavigate } from "react-router-dom";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { Compte, useLoginMutation } from "features/compte/compteSlice";

const SignIn = () => {
  document.title = "Connexion | Radhouani";

  const [passwordShow, setPasswordShow] = useState<any>(false);
  const [username, setUsername] = useState<string>();
  const [loginCompte, { data, isSuccess, error, isError }] = useLoginMutation();
  const navigate = useNavigate();
  if (isError) {
    if ((error as any).data.message === "Invalid username or password") {
      navigate("/connexion", {
        state: { username },
      });
    }
  }
  if (isSuccess) {
    navigate("/");
    localStorage.setItem("token", data.token);
  }

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      idCompte: 1,
      fullname: "",
      username: "",
      password: "",
      code: "",
      role: 1,
      avatar: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Nom Utilisateur est obligatoire"),
      password: Yup.string().required("Mot de passe est obligatoire"),
    }),
    onSubmit: (values: Compte) => {
      loginCompte(values).then(() => navigate("/"));
      console.log(values);
    },
  });

  return (
    <React.Fragment>
      <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
        <div className="auth-header position-fixed top-0 start-0 end-0 bg-body">
          <Container fluid={true}>
            <Row className="justify-content-between align-items-center">
              <Col className="col-2">
                <Link className="navbar-brand mb-2 mb-sm-0" to="/">
                  <img
                    src={logoDark}
                    className="card-logo card-logo-dark"
                    alt="logo dark"
                    height="22"
                  />
                  <img
                    src={logoLight}
                    className="card-logo card-logo-light"
                    alt="logo light"
                    height="22"
                  />
                </Link>
              </Col>
            </Row>
          </Container>
        </div>
        <div className="w-100">
          <Container>
            <Row className="justify-content-center">
              <Col lg={6}>
                <div className="auth-card mx-lg-3">
                  <Card className="border-0 mb-0">
                    <Card.Header className="bg-light border-0">
                      <Row className="justify-content-center">
                        <Col lg={4} className="col-3">
                          <img src={logo} alt="" className="img-fluid" />
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <div className="p-2">
                        <Form
                          onSubmit={(e) => {
                            e.preventDefault();
                            validation.handleSubmit();
                            return false;
                          }}
                        >
                          <div className="mb-3">
                            <Form.Label htmlFor="username">
                              Nom Utilisateur
                            </Form.Label>
                            <Form.Control
                              name="username"
                              type="username"
                              className="form-control"
                              id="username"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.username || ""}
                              isInvalid={
                                validation.touched.username &&
                                validation.errors.username
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.username &&
                            validation.errors.username ? (
                              <Form.Control.Feedback type="invalid">
                                {validation.errors.username}
                              </Form.Control.Feedback>
                            ) : null}
                          </div>

                          <div className="mb-3">
                            <Form.Label htmlFor="password-input">
                              Mot de passe
                            </Form.Label>
                            <div className="position-relative auth-pass-inputgroup mb-3">
                              <Form.Control
                                className="form-control pe-5 password-input"
                                id="password-input"
                                name="password"
                                value={validation.values.password || ""}
                                type={passwordShow ? "text" : "password"}
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                isInvalid={
                                  validation.touched.password &&
                                  validation.errors.password
                                    ? true
                                    : false
                                }
                              />
                              {validation.touched.password &&
                              validation.errors.password ? (
                                <Form.Control.Feedback type="invalid">
                                  {validation.errors.password}
                                </Form.Control.Feedback>
                              ) : null}
                              <Button
                                variant="link"
                                className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                                type="button"
                                id="password-addon"
                                onClick={() => setPasswordShow(!passwordShow)}
                              >
                                <i className="ri-eye-fill align-middle"></i>
                              </Button>
                            </div>
                          </div>

                          <div className="mt-4">
                            <Button
                              variant="light"
                              className="w-100"
                              type="submit"
                            >
                              Se connecter
                            </Button>
                          </div>
                        </Form>
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
                      {new Date().getFullYear()} © Radhouani.
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

export default SignIn;
