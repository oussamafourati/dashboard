import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
} from "react-bootstrap";

// Import Images
import logoDark from "assets/images/logo-dark.png";
import logoLight from "assets/images/logo-light.png";
import img1 from "assets/images/auth/img-1.png";
import { Link } from "react-router-dom";

//redux
import { useSelector, useDispatch } from "react-redux";

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { loginUser, socialLogin, resetLoginFlag } from "slices/thunk";
import withRouter from "Common/withRouter";

const Login = (props: any) => {
  document.title = "Login | Radhouani";

  const dispatch = useDispatch<any>();
  const { user, error } = useSelector((state: any) => ({
    user: state.Account.user,
    error: state.Login.error,
  }));

  const [userLogin, setUserLogin] = useState<any>([]);
  const [passwordShow, setPasswordShow] = useState<any>(false);
  const [loader, setLoader] = useState<boolean>(false);

  useEffect(() => {
    if (user && user) {
      setUserLogin({
        email: user.email,
        password: user.password,
      });
    }
  }, [user]);

  const validation: any = useFormik({
    // enableReinitialize : use this flag when initial values needs to be changed
    enableReinitialize: true,

    initialValues: {
      email: userLogin.email || "admin@themesbrand.com" || "",
      password: userLogin.password || "123456" || "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Please Enter Your Email"),
      password: Yup.string().required("Please Enter Your Password"),
    }),
    onSubmit: (values) => {
      dispatch(loginUser(values, props.router.navigate));
      setLoader(true);
    },
  });

  const signIn = (res: any, type: any) => {
    if (type === "google" && res) {
      const postData = {
        name: res.profileObj.name,
        email: res.profileObj.email,
        token: res.tokenObj.access_token,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.router.navigate, type));
    } else if (type === "facebook" && res) {
      const postData = {
        name: res.name,
        email: res.email,
        token: res.accessToken,
        idToken: res.tokenId,
      };
      dispatch(socialLogin(postData, props.router.navigate, type));
    }
  };

  //handleGoogleLoginResponse
  const googleResponse = (response: any) => {
    signIn(response, "google");
  };

  //handleFacebookLoginResponse
  const facebookResponse = (response: any) => {
    signIn(response, "facebook");
  };

  useEffect(() => {
    setTimeout(() => {
      dispatch(resetLoginFlag());
    }, 3000);
    setLoader(false);
  }, [dispatch, error]);

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
                    <Card.Header className="bg-primary border-0">
                      <Row>
                        <Col lg={4} className="col-3">
                          <img src={img1} alt="" className="img-fluid" />
                        </Col>
                        <Col lg={8} className="col-9">
                          <h1 className="text-white lh-base fw-lighter">
                            Rejoignez notre magasin
                          </h1>
                        </Col>
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <div className="p-2">
                        {error && error ? (
                          <Alert variant="danger">
                            {" "}
                            Username and password are invalid.{" "}
                          </Alert>
                        ) : null}

                        <Form
                          action="#"
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
                              name="email"
                              type="email"
                              className="form-control"
                              id="username"
                              placeholder="Enter username"
                              onChange={validation.handleChange}
                              onBlur={validation.handleBlur}
                              value={validation.values.email || ""}
                              isInvalid={
                                validation.touched.email &&
                                validation.errors.email
                                  ? true
                                  : false
                              }
                            />
                            {validation.touched.email &&
                            validation.errors.email ? (
                              <Form.Control.Feedback type="invalid">
                                {validation.errors.email}
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
                                placeholder="Enter password"
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
                              variant="primary"
                              className="w-100"
                              type="submit"
                              disabled={!error ? loader : false}
                            >
                              {!error
                                ? loader && (
                                    <Spinner
                                      size="sm"
                                      animation="border"
                                      className="me-2"
                                    />
                                  )
                                : ""}
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

export default withRouter(Login);
