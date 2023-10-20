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

const TableDetails = () => {
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
                      <th scope="col">Nom</th>
                      <th scope="col">C.I.N</th>
                      <th scope="col">RIB</th>
                      <th scope="col">Adresse</th>
                      <th scope="col">Telephone</th>
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
                              src={`data:image/jpeg;base64, ${locationClientPhy.state.avatar}`}
                              alt=""
                              className="avatar-xs rounded-circle"
                            />
                          </div>
                          <div className="flex-grow-1">
                            {locationClientPhy.state.raison_sociale}
                          </div>
                        </div>
                      </td>
                      <td>{locationClientPhy.state.cin}</td>
                      <td>{locationClientPhy.state.rib}</td>
                      <td>{locationClientPhy.state.adresse}</td>
                      <td>{locationClientPhy.state.tel}</td>
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

export default TableDetails;
