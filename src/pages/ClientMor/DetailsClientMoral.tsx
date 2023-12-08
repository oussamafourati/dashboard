import React from "react";
import { Card, Container } from "react-bootstrap";

import { useLocation } from "react-router-dom";

const Status = ({ status }: any) => {
  switch (status) {
    case 0:
      return <span className="badge badge-soft-danger fs-14"> Inactif</span>;
    case 1:
      return <span className="badge badge-soft-success fs-20"> Actif</span>;
    default:
      return <span className="badge badge-soft-danger fs-14">Inactif</span>;
  }
};

const DetailsClientMoral = () => {
  const locationClientPhy = useLocation();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true}>
          <Card>
            <Card.Body>
              <div className="d-flex justify-content-center">
                <div className="flex-shrink-0 me-2">
                  <img
                      src={`data:image/jpeg;base64, ${locationClientPhy.state.logo}`}
                      alt=""
                      className="rounded-2"
                      width="120"
                   />
                </div> 
              </div>
              <div className="d-flex align-items-center">
              <p className="fs-17 fw-bold">Raison sociale: </p>
              <p className="fs-23 fw-bold">
                  {locationClientPhy.state.raison_sociale}
              </p>
              </div>
              <div className="d-flex align-items-center">
              <p className="fs-17 fw-bold">Matricule: </p>
              <p className="fs-23 fw-bold">
                  {locationClientPhy.state.mat}
              </p>
              </div>      
              <div className="d-flex align-items-center">
              <p className="fs-17 fw-bold">RIB: </p>
              <p className="fs-23 fw-bold">
                  {locationClientPhy.state.rib}
              </p>
              </div>  
              <div className="d-flex align-items-center">
              <p className="fs-17 fw-bold">Adresse: </p>
              <p className="fs-23 fw-bold">
                  {locationClientPhy.state.adresse}
              </p>
              </div>  
              <div className="d-flex align-items-center">
              <p className="fs-17 fw-bold">Telephone: </p>
              <p className="fs-23 fw-bold">
                  {locationClientPhy.state.tel}
              </p>
              </div>  
              <div className="d-flex align-items-center">
              <p className="fs-17 fw-bold">E-mail: </p>
              <p className="fs-23 fw-bold">
                  {locationClientPhy.state.mail}
              </p>
              </div> 
              <div className="d-flex align-items-center">
              <p className="fs-17 fw-bold">Etat: </p>
              <p className="fs-23 fw-bold">
              <Status status={locationClientPhy.state.etat} />
              </p>
              </div>
              <div className="d-flex align-items-center">
              <p className="fs-17 fw-bold">Remarque: </p>
              <p className="fs-23 fw-bold">
                  {locationClientPhy.state.remarque}
              </p>
              </div> 
             
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DetailsClientMoral;
