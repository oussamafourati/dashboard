import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import Swal from "sweetalert2";
import {
  useFetchClientPhysiquesQuery,
  useAddClientPhysiqueMutation,
} from "features/clientPhysique/clientPhysiqueSlice";

const ModalClientPhy = () => {
  const { data = [] } = useFetchClientPhysiquesQuery();
  const [createClientPhysique] = useAddClientPhysiqueMutation();

  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le Client Physique a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  const [selectedEtat, setSelectedEtat] = useState<string>("");
  // This function is triggered when the select changes
  const selectChangeEtat = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedEtat(value);
  };

  const etatActive = data.filter((fournisseur) => fournisseur.etat === 1);
  const etatNonActive = data.filter((fournisseur) => fournisseur.etat === 0);

  const clientPhysiqueInitialValue = {
    idclient_p: 99,
    raison_sociale: "",
    adresse: "",
    tel: "",
    mail: "",
    cin: "",
    avatar: "",
    rib: "",
    etat: 1,
    remarque: "",
    credit: 123,
    piecejointes: "",
  };
  const [formData, setFormData] = useState(clientPhysiqueInitialValue);

  const {
    raison_sociale,
    adresse,
    tel,
    mail,
    cin,
    avatar,
    rib,
    etat,
    remarque,
    credit,
    piecejointes,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    formData["etat"] = parseInt(selectedEtat);
    e.preventDefault();
    createClientPhysique(formData).then(() =>
      setFormData(clientPhysiqueInitialValue)
    );
    notify();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("avatar") as HTMLInputElement
    ).files?.item(0) as File;
    const base64 = await convertToBase64(fileLogo);
    setFormData({
      ...formData,
      avatar: base64 as string,
    });
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1];

        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  }

  return (
    <React.Fragment>
      <form className="tablelist-form" onSubmit={onSubmit}>
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
                      src={`data:image/jpeg;base64, ${formData.avatar}`}
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
                Nom Client <span className="text-danger">*</span>
              </Form.Label>
              <input
                type="text"
                value={formData.raison_sociale}
                onChange={onChange}
                id="raison_sociale"
                required
                className="form-control"
              />
            </div>
          </Col>
          <Col lg={6} className="mt-3">
            <div className="mb-3">
              <Form.Label htmlFor="cin">
                C.I.N
              </Form.Label>
              <input
                className="form-control"
                type="number"
                value={formData.cin}
                onChange={onChange}
                id="cin"
                minLength={8}
                maxLength={8}
              
              />
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Form.Label htmlFor="rib">
                RIB
              </Form.Label>
              <Form.Control
                type="number"
                value={formData.rib}
                onChange={onChange}
                id="rib"
              
              />
            </div>
          </Col>
          <Col lg={5}>
            <div className="mb-3">
              <Form.Label htmlFor="adresse">
                Adresse
              </Form.Label>
              <input
                className="form-control"
                type="text"
                value={formData.adresse}
                onChange={onChange}
                id="adresse"
                
              />
            </div>
          </Col>
          <Col lg={3}>
            <div className="mb-3">
              <Form.Label htmlFor="tel">
                Telephone
              </Form.Label>
              <input
                className="form-control"
                type="number"
                value={formData.tel}
                onChange={onChange}
                id="tel"
                maxLength={8}
                minLength={8}
                
              />
            </div>
          </Col>

          <Col lg={5}>
            <div className="mb-3">
              <Form.Label htmlFor="mail">E-mail</Form.Label>
              <Form.Control
                type="email"
                value={formData.mail}
                onChange={onChange}
                id="mail"
              
              />
            </div>
          </Col>
          <Col lg={3}>
            <div className="mb-3">
              <Form.Label htmlFor="etat">Etat</Form.Label>
              <select
                onChange={selectChangeEtat}
                className="form-select"
                name="choices-single-default"
                id="etat"
              >
                <option value="">Choisir</option>
                <option value={1}>Actif</option>
                <option value={0}>Inactif</option>
              </select>
            </div>
          </Col>
          <Col lg={4}>
            <div className="mb-3">
              <Form.Label htmlFor="remarque">Remarque</Form.Label>
              <Form.Control
                type="text"
                value={formData.remarque}
                onChange={onChange}
                id="remarque"
             
              />
            </div>
          </Col>
          <Col lg={12} className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button type="submit" variant="primary" id="add-btn">
                Ajouter
              </Button>
            </div>
          </Col>
        </Row>
      </form>
    </React.Fragment>
  );
};

export default ModalClientPhy;
