import React, { useMemo, useState } from 'react';
import { productList } from 'Common/data';
import TableContainer from 'Common/TableContainer';
import { Col, Dropdown, Form, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer, toast } from "react-toastify";
import moment from 'moment';
import { useAddProduitMutation, useDeleteProduitMutation, useFetchProduitsQuery, Produit } from 'features/produit/productSlice';

const ProductTable = () => {
  const {data = []} = useFetchProduitsQuery()
  console.log(data)
  const [createProduct] = useAddProduitMutation()
  const [deleteProduct] = useDeleteProduitMutation()
  const deleteHandler = async (id: any) => {
    await deleteProduct(id);
  };
  const notify = () => {
    toast.success("Le Product a été créé avec succès", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const [formData, setFormData] = useState({
    idproduit: 99,
    nomProduit: "",
    imageProduit:  "",
    marque: "",
    prixAchatHt: 11,
    prixAchatTtc: 22,
    prixVente: 33,
    remise: 0.12 ,
    remarqueProduit: "",
    nom: "",
    raison_sociale: ""
  });

  const {
    idproduit,
    nomProduit,
    imageProduit,
    marque,
    prixAchatHt,
    prixAchatTtc,
    prixVente,
    remise ,
    remarqueProduit,
    nom,
    raison_sociale
  } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createProduct(formData).then(() => setFormData(formData));
    notify();
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
    const updateTime = moment(getTime, 'hh:mm').format('hh:mm') + " " + meridiem;
    return updateTime;
  };

  const columns = useMemo(() => [
    {
      Header: "Nom Produit",
      disableFilters: true,
      filterable: true,
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
            
          </div><div className="flex-grow-1 ms-2 user_name">{produit.nom}</div>
                </>
        );
      },
    },
    {
      Header: "Category",
      accessor: "nom",
      Filter: true,
    },
    
    {
      Header: "Prix Achat HT",
      accessor: "prixAchatHt",
      Filter: false
    },
    {
      Header: "Prix Achat TTC",
      accessor: "prixAchatTtc",
      Filter: false,
    },
    {
      Header: "Prix Vente",
      accessor: "prixVente",
      Filter: false,
    },
   
    {
      Header: "Action",
      Cell: (produit: Produit) => {
        return (
          <React.Fragment>
            <Dropdown className="text-center">
              <Dropdown.Toggle href="#" className="btn btn-ghost-primary btn-icon btn-sm arrow-none">
                <i className="mdi mdi-dots-horizontal" />
              </Dropdown.Toggle>
              <Dropdown.Menu as="ul" className="dropdown-menu-end">
                <li>
                  <Dropdown.Item href="/product-create" >
                    <i className="ri-pencil-fill align-bottom me-2 text-muted" /> Edit
                  </Dropdown.Item>
                </li>
                <li>
                  <Dropdown.Item href="#" className="remove-list" onClick={()=> deleteHandler(produit.idproduit)}>
                    <i className="ri-delete-bin-fill align-bottom me-2 text-muted" />Delete
                  </Dropdown.Item>
                </li>
              </Dropdown.Menu>
            </Dropdown>
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
                <Link to="/product-create" className="btn btn-success" id="addproduct-btn"><i className="ri-add-line align-bottom me-1"></i> Ajouter Produit</Link>
              </div>
          </Col>
          <Col className="col-sm">
              <div className="d-flex justify-content-sm-end">
                  <div className="search-box ms-2">
                    <Form.Control type="text" autoComplete="off" id="searchProductList" placeholder="Rechercher Produits..." />
                    <i className="ri-search-line search-icon"></i>
                  </div>
              </div>
          </Col>
      </Row>
      <div>
        <TableContainer
          columns={columns}
          data={(data || [])}
          // isGlobalFilter={true}
          isAddUserList={false}
          customPageSize={10}
          // divClassName="table-responsive mb-1"
          tableClassName="gridjs-table"
          theadClassName="gridjs-thead"
          isProductsFilter={true}
          SearchPlaceholder='Search Products...'
        />
      </div>
    </React.Fragment>
  );
};

export default ProductTable;
