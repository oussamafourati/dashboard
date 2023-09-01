import React, { useState, useEffect, useMemo } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Offcanvas,
  Row,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import Breadcrumb from "Common/BreadCrumb";

import {
  useFetchCategoriesQuery,
  useDeleteCategoryMutation,
  Category,
} from "features/category/categorySlice";
import {
  SubCategory,
  useFetchSubCategoriesQuery,
} from "features/subCategory/subCategorySlice";
import { useCreateCategoryMutation } from "features/category/categorySlice";
import Swal from "sweetalert2";

const Categories = () => {
  // Toast Notification
  const notify = () => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Le catégorie a été créer avec succès",
      showConfirmButton: false,
      timer: 2500,
    });
  };
  // Fetch Category
  const { data } = useFetchCategoriesQuery();
  const [createCategory] = useCreateCategoryMutation();
  const { data: subdata = [] } = useFetchSubCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [expanded, setExpanded] = useState(false);
  const dataForDisplay = expanded ? subdata : subdata.slice(0, 4);

  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger",
    },
    buttonsStyling: false,
  });

  const AlertDelete = async (id: any) => {
    swalWithBootstrapButtons
      .fire({
        title: "Êtes-vous sûr?",
        text: "Vous ne pourrez pas revenir en arrière !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Oui, supprimez-le !",
        cancelButtonText: "Non, annulez !",
        reverseButtons: true,
      })
      .then((result) => {
        if (result.isConfirmed) {
          deleteCategory(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Catégorie a été supprimé.",
            "success"
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Catégorie est en sécurité :)",
            "error"
          );
        }
      });
  };

  const [categoryData, setCategoryData] = useState({
    idcategory: 1,
    nom: "",
    image: "",
    id_parent: 1,
    final_level: 1,
    title: "",
  });
  const { nom, image } = categoryData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCategoryData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createCategory(categoryData).then(() =>
      setCategoryData({
        idcategory: 1,
        nom: "",
        image: "",
        id_parent: 1,
        final_level: 1,
        title: "",
      })
    );
    notify();
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = (
      document.getElementById("image") as HTMLInputElement
    ).files?.item(0) as File;

    const base64PJ = await convertToBase64(file);

    setCategoryData({
      ...categoryData,
      image: base64PJ as string,
    });
  };

  function convertToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        const base64String = fileReader.result as string;
        const base64Data = base64String.split(",")[1];

        resolve(base64Data);
      };
      fileReader.onerror = (error) => {
        reject(error);
      };
      fileReader.readAsDataURL(file);
    });
  }

  document.title = "Categories | Radhouani";

  const [show, setShow] = useState<boolean>(false);
  const [info, setInfo] = useState<any>([]);

  // Pagination
  const [pagination, setPagination] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<any>(1);
  const [currentpages, setCurrentpages] = useState<any>([]);
  const perPageData = 9;

  const handleClick = (e: any) => {
    setCurrentPage(Number(e.target.id));
  };

  const indexOfLast = currentPage * perPageData;
  const indexOfFirst = indexOfLast - perPageData;

  const currentdata = useMemo(
    () => data?.slice(indexOfFirst, indexOfLast),
    [indexOfFirst, indexOfLast]
  );

  useEffect(() => {
    setCurrentpages(currentdata);
  }, [currentPage, currentdata]);

  const searchTeamMember = (ele: any) => {
    let search = ele.target.value;
    if (search) {
      search = search.toLowerCase();
      setCurrentpages(
        data?.filter((data: any) =>
          data.categoryTitle.toLowerCase().includes(search)
        )
      );
      setPagination(false);
    } else {
      setCurrentpages(currentdata);
      setPagination(true);
    }
  };

  const pageNumbers: any = [];
  for (let i = 1; i <= Math.ceil(data?.length! / perPageData); i++) {
    pageNumbers.push(i);
  }

  const handleprevPage = () => {
    let prevPage = currentPage - 1;
    setCurrentPage(prevPage);
  };

  const handlenextPage = () => {
    let nextPage = currentPage + 1;
    setCurrentPage(nextPage);
  };

  useEffect(() => {
    if (pageNumbers.length && pageNumbers.length < currentPage) {
      setCurrentPage(pageNumbers.length);
    }
  }, [currentPage, pageNumbers.length]);

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Breadcrumb title="Catégories" pageTitle="Produits" />
          <Row>
            <Col xxl={3}>
              <Card>
                <Card.Header>
                  <h6 className="card-title mb-0">Créer Catégorie</h6>
                </Card.Header>
                <Card.Body>
                  <form
                    autoComplete="off"
                    className="needs-validation createCategory-form"
                    id="createCategory-form"
                    onSubmit={onSubmit}
                  >
                    <input
                      type="hidden"
                      id="categoryid-input"
                      className="form-control"
                      value=""
                    />
                    <Row>
                      <Col xxl={12} lg={6}>
                        <div className="text-center mb-3">
                          <label htmlFor="nom" className="form-label">
                            Nom Catégorie <span className="text-danger">*</span>
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="nom"
                            onChange={onChange}
                            value={categoryData.nom}
                            required
                          />
                          <div className="invalid-feedback">
                            Please enter a category title.
                          </div>
                        </div>
                      </Col>
                      <Col xxl={12} lg={6}>
                        <div className="text-center mb-3">
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
                                title="Select Category Image"
                              >
                                <span className="avatar-xs d-inline-block">
                                  <span className="avatar-title bg-light border rounded-circle text-muted cursor-pointer">
                                    <i className="ri-image-fill"></i>
                                  </span>
                                </span>
                              </label>
                              <input
                                className="form-control d-none"
                                id="image"
                                type="file"
                                accept=".png, .gif, .jpeg, .jpg"
                                onChange={(e) => handleFileUpload(e)}
                                // required={true}
                              />
                            </div>
                            <div className="avatar-lg">
                              <div className="avatar-title bg-light rounded-3">
                                <img
                                  src={`data:image/jpeg;base64,${categoryData.image}`}
                                  alt=""
                                  id="image"
                                  className="avatar-md h-auto rounded-3 object-fit-cover"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="error-msg mt-1">
                            Please add a category images.
                          </div>
                        </div>
                      </Col>
                      <Col xxl={12}>
                        <div className="text-end mt-3">
                          <Button variant="success" type="submit">
                            Ajouter Categorie
                          </Button>
                        </div>
                      </Col>
                    </Row>
                  </form>
                </Card.Body>
              </Card>
            </Col>
            <Col xxl={9}>
              {/* <Row className="justify-content-between mb-4">
                <Col xxl={3} lg={6}>
                  <div className="search-box mb-3 mb-lg-0">
                    <Form.Control
                      type="text"
                      id="searchInputList"
                      placeholder="Rechercher Catégorie..."
                      onChange={(e) => searchTeamMember(e)}
                    />
                    <i className="ri-search-line search-icon"></i>
                  </div>
                </Col>
              </Row> */}
              <Row id="categories-list">
                {(currentpages || data)?.map((item: Category, key: number) => (
                  <Col xxl={4} md={6} key={key}>
                    <Card className="categrory-widgets overflow-hidden">
                      <Card.Body className="p-4">
                        <div className="d-flex align-items-center mb-3">
                          <h5 className="flex-grow-1 mb-0">{item.nom}</h5>
                          <ul className="flex-shrink-0 list-unstyled hstack gap-1 mb-0">
                            <li>
                              <Link
                                to="#"
                                className="link-danger"
                                onClick={() => AlertDelete(item.idcategory)}
                              >
                                <i className="ri-delete-bin-5-line ri-xl" />
                              </Link>
                            </li>
                          </ul>
                        </div>
                        <div className="mt-3">
                          <Link
                            to="#"
                            className="fw-medium link-effect"
                            onClick={() => {
                              setShow(true);
                              setInfo(item);
                            }}
                          >
                            Détails
                            <i className="ri-arrow-right-line align-bottom ms-1"></i>
                          </Link>
                        </div>
                        <img
                          src={`data:image/jpeg;base64,${item.image}`}
                          alt={item.nom}
                          className="img-fluid category-img object-fit-cover"
                        />
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              {pagination && (
                <Row id="pagination-element" className="mb-4">
                  <Col lg={12}>
                    <div className="pagination-block pagination pagination-separated justify-content-center justify-content-sm-end mb-sm-0">
                      <div
                        className={
                          currentPage <= 1 ? "page-item disabled" : "page-item"
                        }
                      >
                        <Button
                          variant="link"
                          href="#"
                          className="page-link"
                          id="page-prev"
                          onClick={() => handleprevPage()}
                        >
                          ←
                        </Button>
                      </div>
                      <span id="page-num" className="pagination">
                        {pageNumbers.map((item: any, key: any) => (
                          <React.Fragment key={key}>
                            <div
                              className={
                                currentPage === item
                                  ? "page-item active"
                                  : "page-item"
                              }
                            >
                              <Link
                                className="page-link clickPageNumber"
                                to="#"
                                key={key}
                                id={item}
                                onClick={(e) => handleClick(e)}
                              >
                                {item}
                              </Link>
                            </div>
                          </React.Fragment>
                        ))}
                      </span>
                      <div
                        className={
                          currentPage >= pageNumbers.length
                            ? "page-item disabled"
                            : "page-item"
                        }
                      >
                        <Button
                          variant="link"
                          href="#"
                          className="page-link"
                          id="page-next"
                          onClick={() => handlenextPage()}
                        >
                          →
                        </Button>
                      </div>
                    </div>
                  </Col>
                </Row>
              )}
            </Col>
          </Row>
        </Container>
      </div>

      <Offcanvas show={show} onHide={() => setShow(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>#{info.idcategory}</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="avatar-xl mx-auto">
            <div className="avatar-title bg-light rounded">
              <img
                src={`data:image/jpeg;base64,${info.image}`}
                alt=""
                className="avatar-xl overview-img"
              />
            </div>
          </div>
          <div className="text-center mt-3">
            <h5 className="overview-title">{info.nom}</h5>
            {/* <p className="text-muted">
              by{" "}
              <Link to="#" className="text-reset">
                Admin
              </Link>
            </p> */}
          </div>

          {/* <h6 className="fs-14">Description</h6>
          <p className="text-muted overview-desc">{info.description}</p> */}

          <h6 className="fs-14 mb-3">Sous Catégories</h6>
          <ul
            className="vstack gap-2 mb-0 subCategory"
            style={{ listStyleType: "circle" }}
          >
            {subdata.map((subcat: SubCategory, key: number) => {
              if (subcat.parentID === info.idcategory)
                return (
                  <li key={subcat.idSubCategory}>
                    <Link to="#" className="text-muted">
                      {subcat.title}
                    </Link>
                  </li>
                );
            })}
          </ul>
        </Offcanvas.Body>
        <div className="p-3 border-top">
          <Row>
            <Col sm={6}>
              <div data-bs-dismiss="offcanvas">
                <Button
                  variant="danger"
                  type="button"
                  className="btn btn-danger w-100 remove-list"
                  data-bs-toggle="modal"
                  data-bs-target="#delteModal"
                  data-remove-id="12"
                  onClick={() => {
                    AlertDelete(info.idcategory);
                    setShow(false);
                  }}
                >
                  <i className="ri-delete-bin-line me-1 align-bottom"></i>{" "}
                  Supprimer
                </Button>
              </div>
            </Col>
            {/* <Col sm={6}>
              <Button
                variant="secondary"
                type="button"
                className="w-100 edit-list"
                data-bs-dismiss="offcanvas"
                data-edit-id="12"
              >
                <i className="ri-pencil-line me-1 align-bottom"></i> Modifier
              </Button>
            </Col> */}
          </Row>
        </div>
      </Offcanvas>
    </React.Fragment>
  );
};

export default Categories;
