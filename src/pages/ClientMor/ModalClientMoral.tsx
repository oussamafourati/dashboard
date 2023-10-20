import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";

import {
  useFetchClientMoralesQuery,
  useAddClientMoraleMutation,
  useDeleteClientMoraleMutation,
} from "features/clientMoral/clientMoralSlice";

const ModalClientMoral = () => {
  const notify = () => {
    Swal.fire({
      icon: "success",
      title: "Ajouté",
      text: "Le Client Morale a été créer avec succès",
    });
  };

  const [selectedEtatClient, setSelectedEtatClient] = useState<string>("");
  // This function is triggered when the select changes
  const selectChangeEtatClient = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = event.target.value;
    setSelectedEtatClient(value);
  };

  const { data = [] } = useFetchClientMoralesQuery();
  const [createClientMorale] = useAddClientMoraleMutation();
  const [deleteClientMorale] = useDeleteClientMoraleMutation();

  const etatActive = data.filter((clienmorale) => clienmorale.etat === 1);
  const etatNonActive = data.filter((clienmorale) => clienmorale.etat === 0);

  const clienMoraleInitialValue = {
    idclient_m: 99,
    raison_sociale: "",
    adresse: "",
    tel: "",
    mail: "",
    mat: "",
    logo: "",
    rib: "",
    etat: 1,
    remarque: "",
    credit: 123,
    piecejointes: "",
  };

  const [formData, setFormData] = useState(clienMoraleInitialValue);

  const {
    raison_sociale,
    adresse,
    tel,
    mail,
    mat,
    logo,
    rib,
    etat,
    remarque,
    credit,
    piecejointes,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      etat: parseInt(selectedEtatClient),
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createClientMorale(formData).then(() =>
      setFormData(clienMoraleInitialValue)
    );
    notify();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("logo") as HTMLInputElement
    ).files?.item(0) as File;

    const base64 = await convertToBase64(fileLogo);

    setFormData({
      ...formData,
      logo: base64 as string,
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

  return (
    <React.Fragment>
      <Form className="tablelist-form" onSubmit={onSubmit}>
        <Row>
          <div
            id="alert-error-msg"
            className="d-none alert alert-danger py-2"
          ></div>
          <input type="hidden" id="id-field" />
          <Col lg={12} className="text-center">
            <div className="mb-3">
              <div className="position-relative d-inline-block">
                <div className="position-absolute top-100 start-100 translate-middle">
                  <label
                    htmlFor="logo"
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
                    name="logo"
                    id="logo"
                    accept="image/*"
                    onChange={(e) => handleFileUpload(e)}
                  />
                </div>
                <div className="avatar-lg">
                  <div className="avatar-title bg-light rounded-3">
                    <img
                      src={`data:image/jpeg;base64, ${formData.logo}`}
                      alt=""
                      id="category-img"
                      className="avatar-md h-auto rounded-3 object-fit-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={6} className="mt-3">
            <div className="mb-3">
              <Form.Label htmlFor="raison_sociale">
                Raison Sociale <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.raison_sociale}
                onChange={onChange}
                id="raison_sociale"
                required
              />
            </div>
          </Col>
          <Col lg={6} className="mt-3">
            <div className="mb-3">
              <Form.Label htmlFor="mat">
                Matricule Fiscale <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.mat}
                onChange={onChange}
                id="mat"
                required
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Form.Label htmlFor="rib">
                RIB <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                value={formData.rib}
                onChange={onChange}
                id="rib"
                required
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Form.Label htmlFor="tel">
                Telephone <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="number"
                value={formData.tel}
                onChange={onChange}
                id="tel"
                required
                minLength={8}
                maxLength={8}
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Form.Label htmlFor="adresse">
                Adresse <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={formData.adresse}
                onChange={onChange}
                id="adresse"
                required
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Form.Label htmlFor="mail">E-mail</Form.Label>
              <Form.Control
                type="text"
                value={formData.mail}
                onChange={onChange}
                id="mail"
                required
              />
            </div>
          </Col>
          <Col lg={3}>
            <div className="mb-3">
              <Form.Label htmlFor="etat">Etat</Form.Label>
              <select
                className="form-select"
                data-choices
                data-choices-search-false
                id="etat"
                onChange={selectChangeEtatClient}
                required
              >
                <option value="">Choisir</option>
                <option value={1}>Actif</option>
                <option value={0}>Inactif</option>
              </select>
            </div>
          </Col>
          <Col lg={5}>
            <div className="mb-3">
              <Form.Label htmlFor="remarque">Remarque</Form.Label>
              <Form.Control
                type="text"
                value={formData.remarque}
                onChange={onChange}
                id="remarque"
                required
              />
            </div>
          </Col>
          <Col lg={12} className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button type={"submit"} variant="primary" id="add-btn">
                Ajouter
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default ModalClientMoral;
