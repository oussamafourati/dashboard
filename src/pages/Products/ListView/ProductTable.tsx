import React, { useMemo, useState } from "react";
import TableContainer from "Common/TableContainer";
import { Col, Form, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import moment from "moment";
import {
  useDeleteProduitMutation,
  useFetchProduitsQuery,
  Produit,
} from "features/produit/productSlice";
import Swal from "sweetalert2";

const ProductTable = () => {
  const { data = [] } = useFetchProduitsQuery();

  const [deleteProduit] = useDeleteProduitMutation();
  const handleDelete = async (id: number) => {
    deleteProduit(id);
  };

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
          deleteProduit(id);
          swalWithBootstrapButtons.fire(
            "Supprimé !",
            "Le Produit a été supprimé.",
            "success"
          );
        } else if (
          /* Read more about handling dismissals below */
          result.dismiss === Swal.DismissReason.cancel
        ) {
          swalWithBootstrapButtons.fire(
            "Annulé",
            "Le Produit est en sécurité :)",
            "error"
          );
        }
      });
  };

  const [formData, setFormData] = useState({
    idproduit: 99,
    nomProduit: "",
    imageProduit: "",
    marque: "",
    prixAchatHt: 11,
    prixAchatTtc: 22,
    prixVente: 33,
    remise: 0.12,
    PourcentageBenifice: 15,
    Benifice: 150,
    PrixRemise: 126,
    PourcentageRemise: 20,
    remarqueProduit: "",
    nom: "",
    raison_sociale: "",
  });

  const {
    idproduit,
    nomProduit,
    imageProduit,
    marque,
    prixAchatHt,
    prixAchatTtc,
    prixVente,
    remise,
    PourcentageBenifice,
    Benifice,
    PrixRemise,
    PourcentageRemise,
    remarqueProduit,
    nom,
    raison_sociale,
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const fileLogo = (
      document.getElementById("imageProduit") as HTMLInputElement
    ).files?.item(0) as File;

    const base64 = await convertToBase64(fileLogo);

    setFormData({
      ...formData,
      imageProduit: base64 as string,
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

  const handleValidDate = (date: any) => {
    const date1 = moment(new Date(date)).format("DD MMM Y");
    return date1;
  };

  const handleValidTime = (time: any) => {
    const time1 = new Date(time);
    const getHour = time1.getUTCHours();
    const getMin = time1.getUTCMinutes();
    const getTime = `${getHour}:${getMin}`;
    var meridiem = "";
    if (getHour >= 12) {
      meridiem = "PM";
    } else {
      meridiem = "AM";
    }
    const updateTime =
      moment(getTime, "hh:mm").format("hh:mm") + " " + meridiem;
    return updateTime;
  };

  const columns = useMemo(
    () => [
      {
        Header: "Nom Produit",
        // disableFilters: true,
        // filterable: true,
        Filter: true,
        accessor: (produit: Produit) => {
          return (
            <>
              <div className="d-flex align-items-center gap-2">
                <div className="flex-shrink-0">
                  <img
                    src={`data:image/jpeg;base64, ${produit.imageProduit}`}
                    alt=""
                    className="avatar-xs rounded-circle user-profile-img"
                  />
                </div>
                <div className="flex-grow-1 ms-2 user_name">
                  {produit.nomProduit}
                </div>
              </div>
              {/* <div className="flex-grow-1 ms-2 user_name">{produit.nom}</div> */}
            </>
          );
        },
      },
      // {
      //   Header: "Category",
      //   accessor: "nom",
      //   Filter: true,
      // },
      {
        Header: "marque",
        accessor: "marque",
        Filter: false,
      },
      {
        Header: "remarqueProduit",
        accessor: "remarqueProduit",
        Filter: false,
      },
      {
        Header: "Action",
        Filter: true,
        accessor: (produit: Produit) => {
          return (
            <React.Fragment>
              <ul className="hstack gap-2 list-unstyled mb-0">
                {/* <li>
                  <Link to="#">
                    <i className="ri-pencil-fill align-bottom me-2 text-muted" />
                    Modifier
                  </Link>
                </li> */}
                <li>
                  <Link
                    to="#"
                    className="remove-list"
                    onClick={() => AlertDelete(produit.idproduit)}
                  >
                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted" />
                    Supprimer
                  </Link>
                </li>
              </ul>
            </React.Fragment>
          );
        },
      },
    ],
    []
  );
  return (
    <React.Fragment>
      <Row className="g-4 mb-4">
        <Col className="col-sm-auto">
          <div>
            <Link
              to="/product-create"
              className="btn btn-success"
              id="addproduct-btn"
            >
              <i className="ri-add-line align-bottom me-1"></i> Ajouter Produit
            </Link>
          </div>
        </Col>
        {/* <Col className="col-sm">
          <div className="d-flex justify-content-sm-end">
            <div className="search-box ms-2">
              <Form.Control
                type="text"
                autoComplete="off"
                id="searchProductList"
                placeholder="Rechercher Produits..."
              />
              <i className="ri-search-line search-icon"></i>
            </div>
          </div>
        </Col> */}
      </Row>
      <div>
        <TableContainer
          columns={columns}
          data={data || []}
          isGlobalFilter={true}
          isAddUserList={false}
          customPageSize={10}
          // divClassName="table-responsive mb-1"
          tableClassName="gridjs-table"
          theadClassName="gridjs-thead"
          isProductsFilter={true}
          SearchPlaceholder="Search Products..."
        />
      </div>
    </React.Fragment>
  );
};

export default ProductTable;
