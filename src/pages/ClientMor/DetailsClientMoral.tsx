import React from "react";
import { Card, Container } from "react-bootstrap";

import { useLocation } from "react-router-dom";

const Status = ({ status }: any) => {
  switch (status) {
    case 0:
      return <span className="badge badge-soft-danger"> Inactif</span>;
    case 1:
      return <span className="badge badge-soft-success"> Actif</span>;
    default:
      return <span className="badge badge-soft-danger">Inactif</span>;
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
              <div className="table-responsive table-card">
                <table className="table table-borderless table-centered align-middle table-nowrap mb-0">
                  <thead className="text-muted table-light">
                    <tr>
                      <th scope="col">Raison sociale</th>
                      <th scope="col">Matricule</th>
                      <th scope="col">RIB</th>
                      <th scope="col">Adresse</th>
                      <th scope="col">Telephone</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Etat</th>
                      <th scope="col">Remarque</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>
                        <div className="d-flex align-items-center">
                          <div className="flex-shrink-0 me-2">
                            <img
                              src={`data:image/jpeg;base64, ${locationClientPhy.state.logo}`}
                              alt=""
                              className="rounded-2"
                              width="140"
                            />
                          </div>
                          <div className="flex-grow-1">
                            {locationClientPhy.state.raison_sociale}
                          </div>
                        </div>
                      </td>
                      <td>{locationClientPhy.state.mat}</td>
                      <td>{locationClientPhy.state.rib}</td>
                      <td>{locationClientPhy.state.adresse}</td>
                      <td>{locationClientPhy.state.tel}</td>
                      <td>
                        <span>{locationClientPhy.state.mail}</span>
                      </td>
                      <td>
                        <Status status={locationClientPhy.state.etat} />
                      </td>
                      <td>{locationClientPhy.state.remarque}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </Card.Body>
          </Card>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default DetailsClientMoral;
