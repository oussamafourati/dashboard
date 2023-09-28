import React from "react";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import { useGetDayEchancesQuery } from "features/Echance/echanceSlice";

const NewCustomers = () => {
  const { data: EcheancesToDay = [] } = useGetDayEchancesQuery();
  return (
    <React.Fragment>
      <div className="card card-height-100">
        <div className="card-header align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Echéances aujourd'hui</h4>
          <Link to="/echeances" className="flex-shrink-0">
            Afficher tout{" "}
            <i className="ri-arrow-right-line align-bottom ms-1"></i>
          </Link>
        </div>
        {EcheancesToDay.length === 0 ? (
          <SimpleBar className="mt-5 text-center p-4">
            <div>
              <p className="fs-18 text-muted fw-medium">
                Vous n'avez pas des échéances aujourd'hui!
              </p>
            </div>
          </SimpleBar>
        ) : (
          <SimpleBar style={{ maxHeight: "445px" }}>
            {(EcheancesToDay || []).map((item, key) => (
              <div className="p-1 border-bottom border-bottom-dashed" key={key}>
                <div className="d-flex align-items-center gap-1">
                  <div className="flex-grow-1">
                    <div className="card-body">
                      <div className="table-responsive">
                        <table className="table table-sm table-borderless align-middle description-table mb-0">
                          <tbody>
                            <tr>
                              <td>
                                <h6>Nom Client</h6>
                              </td>
                              <td>
                                <span className="text-muted fw-medium">
                                  {item.nomClient}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6>N° Facture</h6>
                              </td>
                              <td>
                                <span className="text-muted fw-medium">
                                  {item.numeroFacture}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6>N° Cheque</h6>
                              </td>
                              <td>
                                <span className="text-muted fw-medium">
                                  {item.numCheque}
                                </span>
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <h6>Banque</h6>
                              </td>
                              <td>
                                <span className="text-muted fw-medium">
                                  {item.nomBanque}
                                </span>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div className="flex-shrink-1">
                    <span className="fs-16 badge badge-soft-secondary">
                      {item.montant}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </SimpleBar>
        )}
      </div>
    </React.Fragment>
  );
};

export default NewCustomers;
