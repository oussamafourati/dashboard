import { useCreateCategoryMutation } from "features/category/categorySlice";
import { convertToBase64 } from "helpers/convertToBase64";
import React, { useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";

import Swal from "sweetalert2";

const ModalCategory = () => {
  // Mutation to create a new Category
  const [createCategory] = useCreateCategoryMutation();

  // Category's Values and Functions
  const initialCategoryValue = {
    idcategory: 1,
    nom: "",
    image: "",
    id_parent: 0,
    final_level: 0,
  };

  const [categoryData, setCategoryData] = useState(initialCategoryValue);
  const { idcategory, nom, image, id_parent, final_level } = categoryData;
  const onChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmitCategory = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCategory(categoryData).then(() => setCategoryData(categoryData));
    notifyCategory();
  };

  const handleFileCategoryUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (document.getElementById("image") as HTMLFormElement).files[0];
    const base64 = await convertToBase64(file);
    setCategoryData({ ...categoryData, image: base64 as string });
  };

  const notifyCategory = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le Catégorie a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };

  // Modal to create a new category
  const [modal_AddCategoryModals, setmodal_AddCategoryModals] =
    useState<boolean>(false);
  function tog_AddCategorysModals() {
    setmodal_AddCategoryModals(!modal_AddCategoryModals);
  }

  return (
    <React.Fragment>
      <Form className="tablelist-form" onSubmit={onSubmitCategory}>
        <Row>
          <Col lg={12}>
            <div className="mb-3">
              <Form.Label htmlFor="nom">
                Nom Catégorie <span className="text-danger">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                value={categoryData.nom}
                onChange={onChangeCategory}
                id="nom"
                placeholder="..."
                required
              />
            </div>
          </Col>
          <Col lg={12} className="text-center">
            <div className="mb-3">
              <label htmlFor="image" className="form-label d-block">
                Image <span className="text-danger">*</span>
              </label>
              <div className="position-relative d-inline-block">
                <div className="position-absolute top-100 start-100 translate-middle">
                  <label
                    htmlFor="image"
                    className="mb-0"
                    data-bs-toggle="tooltip"
                    data-bs-placement="right"
                    title="Select Category's Image"
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
                    name="image"
                    id="image"
                    accept="image/*"
                    onChange={(e) => handleFileCategoryUpload(e)}
                  />
                </div>
                <div className="avatar-xl">
                  <div className="avatar-title bg-light rounded-3">
                    <img
                      src={`data:image/jpeg;base64, ${categoryData.image}`}
                      alt=""
                      id="category-img"
                      className="avatar-md h-auto rounded-3 object-fit-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg={12} className="modal-footer">
            <div className="hstack gap-2 justify-content-end">
              <Button
                className="btn-ghost-danger"
                onClick={() => {
                  tog_AddCategorysModals();
                }}
              >
                <i className="ri-close-line align-bottom me-1"></i> Fermer
              </Button>
              <Button
                type={"submit"}
                onClick={() => {
                  tog_AddCategorysModals();
                }}
                variant="primary"
                id="add-btn"
              >
                Ajouter
              </Button>
            </div>
          </Col>
        </Row>
      </Form>
    </React.Fragment>
  );
};

export default ModalCategory;
