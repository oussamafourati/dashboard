import React from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Image,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import Lottie, { LottieRefCurrentProps } from "lottie-react";
import authAnimation from "../../assets/images/animation_lnbffzwt.json";
import { useRef } from "react";
//img
import logolight from "assets/images/logo-light.png";
import { useLoginMutation } from "features/compte/compteSlice";
import Swal from "sweetalert2";
import { setCredentials } from "../../features/compte/authSlice";
import type { LoginRequest, UserResponse } from "features/compte/compteSlice";
import { useDispatch } from "react-redux";
const Signin = () => {
  const [login, { isLoading }] = useLoginMutation();

  const [formState, setFormState] = React.useState<LoginRequest>({
    username: "",
    password: "",
  });

  const [formResponse, setFormResponse] = React.useState<UserResponse>({
    results: {
      idCompte: 1,
      fullname: "",
      username: "",
      password: "",
      code: "",
      role: 1,
      avatar: "",
    },
    message: "",
    token: "",
  });
  const msgError: string =
    "Désolé, vous n'êtes pas autorisé à accéder à cette page !";
  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) =>
    setFormState((prev) => ({ ...prev, [name]: value }));

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const notify = (fullname: string) => {
    Swal.fire({
      icon: "success",
      title: `Bievenue`,
      text: `Bievenue, ${fullname}`,
      showConfirmButton: false,
      timer: 2200,
    });
    navigate("/");
  };
  const Errornotify = (msg: string) => {
    Swal.fire({
      icon: "error",
      title: "Ooops...!",
      text: `${msg}`,
      showConfirmButton: false,
      timer: 2200,
    });
    navigate("/login");
  };

  const lottieRef = useRef<LottieRefCurrentProps>(null);
  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);
  return (
    <React.Fragment>
      <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
        <div className="auth-header position-absolute top-0 start-0 end-0">
          <Container fluid>
            <Row className="justify-content-center align-items-center">
              <Col xs={2}>
                <Image src={logolight} alt="logo light" height={60} />
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
                            lottieRef.current?.goToAndPlay(45, true);
                          }}
                          animationData={authAnimation}
                          loop={false}
                          style={{ width: 300 }}
                        />
                      </Row>
                    </Card.Header>
                    <Card.Body>
                      <div className="p-1">
                        <div className="mb-2">
                          <Form.Label htmlFor="username">
                            Nom Utilisateur
                          </Form.Label>
                          <Form.Control
                            onChange={handleChange}
                            name="username"
                            type="text"
                          />
                        </div>
                        <div className="mb-2">
                          <Form.Label htmlFor="password-input">
                            Mot de passe
                          </Form.Label>
                          <div className="position-relative auth-pass-inputgroup mb-2">
                            <Form.Control
                              className="form-control pe-5 password-input"
                              id="password-input"
                              name="password"
                              onChange={handleChange}
                              type={show ? "text" : "password"}
                            />

                            <Button
                              variant="link"
                              className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                              type="button"
                              id="password-addon"
                              onClick={handleClick}
                            >
                              <i className="ri-eye-fill align-middle"></i>
                            </Button>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Button
                            variant="primary"
                            className="w-100"
                            type="submit"
                            onClick={async () => {
                              try {
                                const user = await login(formState).unwrap();
                                if (
                                  user.message === "login successfully" &&
                                  user.results.role === 1
                                ) {
                                  dispatch(setCredentials(user));
                                  localStorage.setItem(
                                    "auth",
                                    JSON.stringify(user.token)
                                  );
                                  localStorage.setItem(
                                    "profile",
                                    JSON.stringify(user.results.fullname)
                                  );
                                  notify(user.results.fullname);
                                } else {
                                  Errornotify(msgError);
                                }
                              } catch (err: any) {
                                Errornotify(err);
                              }
                            }}
                          >
                            Se connecter
                          </Button>
                        </div>
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

export default Signin;
