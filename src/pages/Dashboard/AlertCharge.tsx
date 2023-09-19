import React, { useState } from "react";
import SimpleBar from "simplebar-react";
import { Link } from "react-router-dom";
import { useGetChargeDayQuery } from "features/charge/chargeSlice";
import CountUp from "react-countup";
import { Modal } from "react-bootstrap";

const AlertCharge = () => {
  const { data: ChargeToDay = [] } = useGetChargeDayQuery();

  const Totalchargeday = ChargeToDay.reduce(
    (sum, i) => (sum += parseInt(i.montantCharges)),
    0
  );

  const [modal_AddChargeModals, setmodal_AddChargeModals] =
    useState<boolean>(false);
  function tog_AddChargeModals() {
    setmodal_AddChargeModals(!modal_AddChargeModals);
  }

  return (
    <React.Fragment>
      <div className="card card-height-100">
        <div className="card-header align-items-center d-flex">
          <h4 className="card-title mb-0 flex-grow-1">Charge Aujourd'hui</h4>
          <Link
            to="#"
            className="flex-shrink-0"
            onClick={() => tog_AddChargeModals()}
          >
            Plus Détails{" "}
            <i className="ri-arrow-right-line align-bottom ms-1"></i>
          </Link>
        </div>
        {ChargeToDay.length === 0 ? (
          <SimpleBar className="mt-5 text-center p-4">
            <div>
              <p className="fs-18 text-muted fw-medium">
                Vous n'avez rien à payer ces jours-ci
              </p>
            </div>
          </SimpleBar>
        ) : (
          // <SimpleBar style={{ maxHeight: "445px" }}>
          //   {(ChargeToDay || []).map((item, key) => (
          //     <div className="p-1 border-bottom border-bottom-dashed" key={key}>
          //       <div className="d-flex align-items-center gap-1">
          //         <div className="flex-grow-1">
          //           <div className="card-body">
          //             <div className="table-responsive">
          //               <table className="table table-sm table-borderless align-middle description-table mb-0">
          //                 <tbody>
          //                   <tr>
          //                     <td>
          //                       <h6>Description</h6>
          //                     </td>
          //                     <td>
          //                       <span className="text-muted fw-medium">
          //                         {item.descriptionCharge}
          //                       </span>
          //                     </td>
          //                   </tr>
          //                   <tr>
          //                     <td>
          //                       <h6>Date</h6>
          //                     </td>
          //                     <td>
          //                       <span className="text-muted fw-medium">
          //                         {item.dateCharges}
          //                       </span>
          //                     </td>
          //                   </tr>
          //                   <tr>
          //                     <td>
          //                       <h6>Type</h6>
          //                     </td>
          //                     <td>
          //                       <span className="text-muted fw-medium">
          //                         {item.typeCharges}
          //                       </span>
          //                     </td>
          //                   </tr>
          //                 </tbody>
          //               </table>
          //             </div>
          //           </div>
          //         </div>
          //         <div className="flex-shrink-1">
          //           <span className="fs-16 badge badge-soft-secondary">
          //             <CountUp
          //               start={0}
          //               end={parseInt(item.montantCharges)}
          //               separator=","
          //             />{" "}
          //             DT
          //           </span>
          //         </div>
          //       </div>
          //     </div>
          //   ))}
          // </SimpleBar>
          <>
            <div className="mt-1">
              <h4 className="mb-1">
                Total :{" "}
                <small className="fw-normal fs-14">
                  {" "}
                  <CountUp
                    start={0}
                    end={Totalchargeday}
                    separator=","
                    duration={0}
                  />{" "}
                  DT
                </small>
              </h4>
            </div>
            <table className="table table-borderless table-striped align-middle table-sm fs-14 mb-1">
              <tbody>
                {(ChargeToDay || []).map((item, key) => (
                  <tr>
                    <td>
                      <div className="d-flex align-items-center gap-2">
                        <div></div>
                        <h6 className="fw-medium fs-14 mb-0">
                          {item.descriptionCharge}
                        </h6>
                      </div>
                    </td>
                    <td>
                      <CountUp
                        start={0}
                        end={parseInt(item.montantCharges)}
                        separator=","
                        duration={0}
                      />{" "}
                      DT
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </div>
      <Modal
        id="showModal"
        className="fade zoomIn"
        size="lg"
        show={modal_AddChargeModals}
        onHide={() => {
          tog_AddChargeModals();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            En rupture de stock
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">{/* <StockReport />{" "} */}</Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default AlertCharge;
