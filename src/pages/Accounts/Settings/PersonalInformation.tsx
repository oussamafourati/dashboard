import React, { useState } from "react";
import { Compte, useCreateUserMutation } from "features/compte/compteSlice";
import { Button, Card, Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";

const PersonalInformation = () => {
  const [passwordShow, setPasswordShow] = useState<boolean>(false);
  const [checked, setChecked] = useState<boolean>(false);

  const handleChecked = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(!checked);
  };
  let isAdmin = checked ? 1 : 0;
  const [createCompte] = useCreateUserMutation();

  const compteValue = {
    idCompte: 1,
    fullname: "",
    username: "",
    password: "",
    role: 1,
    code: "",
    avatar: "",
  };
  const [compteData, setCompteData] = useState(compteValue);

  const onChangeCompte = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCompteData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("avatar") as HTMLInputElement
    ).files?.item(0) as File;

    const base64 = await convertToBase64(fileLogo);

    setCompteData({
      ...compteData,
      avatar: base64 as string,
    });
  };

  function convertToBase64(file: File | Blob): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();

      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1];

        resolve(base64Data);
      };
      fileReader.readAsDataURL(file);
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  const validationSchema = Yup.object().shape({
    fullname: Yup.string().required("Le nom complet est obligatoire").trim(),
    username: Yup.string()
      .required("Le nom d'utilisateur est obligatoire")
      .trim()
      .min(6, "Le nom d'utilisateur doit comporter au moins 6 caractères")
      .max(20, "Le nom d'utilisateur ne doit pas dépasser 20 caractères"),
    password: Yup.string()
      .required("Le mot de passe est obligatoire")
      .trim()
      .min(6, "Le mot de passe doit comporter au moins 6 caractères"),
    code: Yup.number()
      .required("Le code est obligatoire")
      .positive()
      .integer()
      .min(100, "Le code doit supérieur ou égal à 100")
      .max(999, "Le code ne doit pas dépasser 999"),
    role: Yup.bool()
      .oneOf([true], "Le role est obligatoire")
      .required("Le role est obligatoire"),
  });

  const formik = useFormik({
    initialValues: {
      idCompte: 1,
      fullname: "",
      username: "",
      password: "",
      code: "",
      role: 1,
      avatar: "",
    },
    validationSchema,
    onSubmit: (data: Compte) => {
      data["role"] = isAdmin;
      createCompte(data).then(() => setCompteData(compteValue));
      notify();
    },
  });

  const onSubmitCompte = (e: React.FormEvent<HTMLFormElement>) => {
    compteData["role"] = isAdmin;
    e.preventDefault();
    createCompte(compteData).then(() => setCompteData(compteValue));
    notify();
  };

  const navigate = useNavigate();
  const notify = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "Le compte a été créer avec succès",
    });
    navigate("/liste-comptes");
  };

  return (
    <React.Fragment>
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
            <Form onSubmit={formik.handleSubmit}>
              <Row className="g-3">
                {/* <Col lg={12} className="text-center">
                  <div className="mb-3">
                    <div className="position-relative d-inline-block">
                      <div className="position-absolute top-100 start-100 translate-middle">
                        <label
                          htmlFor="avatar"
                          className="mb-0"
                          data-bs-toggle="tooltip"
                          data-bs-placement="right"
                          title="Select Client Physique Avatar"
                        >
                          <span className="avatar-xs d-inline-block">
                            <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                              <i className="ri-image-fill"></i>
                            </span>
                          </span>
                        </label>
                        <input
                          className="form-control d-none"
                          type="file"
                          name="avatar"
                          id="avatar"
                          accept="image/*"
                          onChange={(e) => handleFileUpload(e)}
                        />
                      </div>
                      <div className="avatar-lg">
                        <div className="avatar-title bg-light rounded-3">
                          <img
                            src={`data:image/jpeg;base64, ${compteData.avatar}`}
                            alt=""
                            id="category-img"
                            className="avatar-md h-auto rounded-3 object-fit-cover"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="error-msg mt-1">
                      Please add a category images.
                    </div>
                  </div>
                </Col> */}
                <Col lg={6}>
                  <div>
                    <Form.Label htmlFor="fullname">
                      Nom <span className="text-danger">*</span>
                    </Form.Label>
                    <input
                      id="fullname"
                      name="fullname"
                      type="text"
                      className={
                        "form-control" +
                        (formik.errors.fullname && formik.touched.fullname
                          ? " is-invalid"
                          : "")
                      }
                      onChange={formik.handleChange}
                      value={formik.values.fullname}
                    />
                    {formik.errors.fullname && formik.touched.fullname ? (
                      <Form.Control.Feedback type="invalid">
                        <div>{formik.errors.fullname} </div>
                      </Form.Control.Feedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={6}>
                  <div>
                    <Form.Label htmlFor="username">
                      Nom Utilisateur <span className="text-danger">*</span>
                    </Form.Label>
                    <input
                      id="username"
                      name="username"
                      type="text"
                      className={
                        "form-control" +
                        (formik.errors.username && formik.touched.username
                          ? " is-invalid"
                          : "")
                      }
                      onChange={formik.handleChange}
                      value={formik.values.username}
                    />
                    {formik.errors.username && formik.touched.username ? (
                      <Form.Control.Feedback type="invalid">
                        <div>{formik.errors.username} </div>
                      </Form.Control.Feedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4}>
                  <Form.Label htmlFor="password">
                    Mot de passe <span className="text-danger">*</span>
                  </Form.Label>
                  <div className="position-relative auth-pass-inputgroup">
                    {/* <Form.Control
                      onChange={onChangeCompte}
                      value={compteData.password}
                      type={passwordShow ? "text" : "password"}
                      className="pe-5 password-input"
                      placeholder="......"
                      id="password"
                      name="password"
                    /> */}
                    <input
                      id="password"
                      name="password"
                      type={passwordShow ? "text" : "password"}
                      className={
                        "form-control" +
                        (formik.errors.password && formik.touched.password
                          ? " is-invalid"
                          : "")
                      }
                      onChange={formik.handleChange}
                      value={formik.values.password}
                    />
                    {formik.errors.password && formik.touched.password ? (
                      <Form.Control.Feedback type="invalid">
                        <div>{formik.errors.password} </div>
                      </Form.Control.Feedback>
                    ) : null}
                    <Button
                      variant="link"
                      className="btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon"
                      type="button"
                      id="password-addon"
                      onClick={() => setPasswordShow(!passwordShow)}
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
                    <input
                      id="code"
                      name="code"
                      type="text"
                      className={
                        "form-control" +
                        (formik.errors.code && formik.touched.code
                          ? " is-invalid"
                          : "")
                      }
                      onChange={formik.handleChange}
                      value={formik.values.code}
                    />
                    {formik.errors.code && formik.touched.code ? (
                      <Form.Control.Feedback type="invalid">
                        <div>{formik.errors.code} </div>
                      </Form.Control.Feedback>
                    ) : null}
                  </div>
                </Col>
                <Col lg={4}>
                  <Form.Label htmlFor="role">
                    Role <span className="text-danger">*</span>
                  </Form.Label>
                  <Form.Check
                    type="checkbox"
                    id="role"
                    label="admin"
                    feedback="invalid."
                    onChange={handleChecked}
                  />
                  {formik.errors.role && formik.touched.role ? (
                    <Form.Control.Feedback type="invalid">
                      <div>{formik.errors.role} </div>
                    </Form.Control.Feedback>
                  ) : null}
                </Col>
                <Col lg={12}>
                  <div className="text-end">
                    <Button variant="secondary" type="submit">
                      Créer
                    </Button>
                  </div>
                </Col>
              </Row>
            </Form>
          </Card.Body>
        </Card>
      </Row>
    </React.Fragment>
  );
};

export default PersonalInformation;
