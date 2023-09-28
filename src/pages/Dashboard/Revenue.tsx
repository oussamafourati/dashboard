import React, { useState, useEffect } from "react";
import { Card, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RevenueCharts } from "./DashboardCharts";

import { useSelector } from "react-redux";

const Revenue = () => {
  const [chartData, setchartData] = useState<any>([]);

  const { revenueChartData } = useSelector((state: any) => ({
    revenueChartData: state.Dashboard.chartData,
  }));

  useEffect(() => {
    setchartData(revenueChartData);
  }, [revenueChartData]);

  const [modal_AddBilanModals, setmodal_AddBilanModals] =
    useState<boolean>(false);
  function tog_AddBilanModals() {
    setmodal_AddBilanModals(!modal_AddBilanModals);
  }

  return (
    <React.Fragment>
      <Link to="#" onClick={() => tog_AddBilanModals()}>
        <Card className="card-height-100">
          <Card.Header className="align-items-center d-flex">
            <h4 className="card-title mb-0 flex-grow-1 text-dark">Bilan</h4>
          </Card.Header>
          <Card.Body>
            <RevenueCharts
              chartData={chartData}
              dataColors='["--tb-secondary", "--tb-danger", "--tb-success"]'
            />
          </Card.Body>
        </Card>
      </Link>
      <Modal
        id="showModal"
        className="fade zoomIn"
        size="xl"
        show={modal_AddBilanModals}
        onHide={() => {
          tog_AddBilanModals();
        }}
        centered
      >
        <Modal.Header className="px-4 pt-4" closeButton>
          <h5 className="modal-title fs-18" id="exampleModalLabel">
            Bilan
          </h5>
        </Modal.Header>
        <Modal.Body className="p-4">
          <RevenueCharts
            chartData={chartData}
            dataColors='["--tb-secondary", "--tb-danger", "--tb-success"]'
          />
        </Modal.Body>
      </Modal>
    </React.Fragment>
  );
};

export default Revenue;
