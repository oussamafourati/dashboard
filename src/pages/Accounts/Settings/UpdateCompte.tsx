import React, { useEffect, useState } from "react";
import {
  Compte,
  useCreateUserMutation,
  useUpdateAccountMutation,
} from "features/compte/compteSlice";
import { Button, Card, Col, Form, Row, Container } from "react-bootstrap";
import Swal from "sweetalert2";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useLocation, useNavigate } from "react-router-dom";
import Breadcrumb from "Common/BreadCrumb";

const UpdateAccount = () => {
  const LocationProduct = useLocation();
  const navigate = useNavigate();
  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le Compte a été modifier avec succès",
      showConfirmButton: false,
      timer: 2000,
    });
  };
  const [checked, setChecked] = useState<boolean>(false);

  const [admin, setAdmin] = useState<number>(LocationProduct.state.role);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (admin === 1) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  }, []);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsAdmin(!isAdmin);
  };

  let isChecked = isAdmin ? 1 : 0;

  const [fullname, setFullname] = useState<string>(
    LocationProduct.state.fullname
  );
  const handleChangeFullName = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setFullname(value);

  const [username, setUsername] = useState<string>(
    LocationProduct.state.username
  );
  const handleChangeUsername = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setUsername(value);

  const [code, setCode] = useState<string>(LocationProduct.state.code);
  const handleChangeCode = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setCode(value);

  const [password, setPassword] = useState<string>("");
  const handleChangePassword = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => setPassword(value);

  // Mutation to create product
  const [updateCompte] = useUpdateAccountMutation();
  // Product's Values and Functions
  const [productData, setProductData] = useState({
    idCompte: 1,
    fullname: "",
    username: "",
    password: "",
    code: "",
    role: 1,
    avatar: "",
  });

  const onSubmitCompte = (e: React.FormEvent<HTMLFormElement>) => {
    productData["fullname"] = fullname;
    productData["username"] = username;
    productData["password"] = password;
    productData["code"] = code;
    productData["role"] = isChecked;
    productData["idCompte"] = LocationProduct.state.idCompte;

    e.preventDefault();
    updateCompte(productData).then(() => setProductData(productData));
    notify();
    navigate("/liste-comptes");
  };

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Modifier Compte" pageTitle="Compte" />
          <Row>
            <Card
              className="mx-auto"
              style={{
                width: "46rem",
                height: "18rem",
                marginTop: 65,
              }}
            >
              <Card.Body>
                <Form onSubmit={onSubmitCompte}>
                  <Row className="g-3">
                    <Col lg={6}>
                      <div>
                        <Form.Label htmlFor="fullname">
                          Nom <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          id="fullname"
                          name="fullname"
                          type="text"
                          onChange={handleChangeFullName}
                          value={fullname}
                        />
                      </div>
                    </Col>
                    <Col lg={6}>
                      <div>
                        <Form.Label htmlFor="username">
                          Nom Utilisateur <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          id="username"
                          name="username"
                          type="text"
                          onChange={handleChangeUsername}
                          value={username}
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <Form.Label htmlFor="password">
                        Nouveau Mot de passe{" "}
                        <span className="text-danger">*</span>
                      </Form.Label>
                      <div className="position-relative auth-pass-inputgroup">
                        <Form.Control
                          id="password"
                          name="password"
                          onChange={handleChangePassword}
                          value={password}
                        />

                        <Button
                          variant="link"
                          className="btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                          type="button"
                          id="password-addon"
                        >
                          <i className="ri-eye-fill align-middle"></i>
                        </Button>
                      </div>
                    </Col>
                    <Col lg={4}>
                      <div>
                        <Form.Label htmlFor="code">
                          Code <span className="text-danger">*</span>
                        </Form.Label>
                        <Form.Control
                          id="code"
                          name="code"
                          type="text"
                          onChange={handleChangeCode}
                          value={code}
                        />
                      </div>
                    </Col>
                    <Col lg={4}>
                      <Form.Label htmlFor="role">
                        Role <span className="text-danger">*</span>
                      </Form.Label>
                      {LocationProduct.state.role === 1 ? (
                        <Form.Check
                          type="checkbox"
                          id="role"
                          label="admin"
                          feedback="invalid."
                          onChange={handleChecked}
                          defaultChecked={!isAdmin}
                        />
                      ) : (
                        <Form.Check
                          type="checkbox"
                          id="role"
                          label="admin"
                          feedback="invalid."
                          onChange={handleChecked}
                          defaultChecked={isAdmin}
                        />
                      )}
                    </Col>
                    <Col lg={12}>
                      <div className="text-end">
                        <Button variant="secondary" type="submit">
                          Modifier
                        </Button>
                      </div>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default UpdateAccount;
