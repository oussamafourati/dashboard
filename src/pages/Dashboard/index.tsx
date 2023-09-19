import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import Revenue from "./Revenue";
import Widgets from "./Widgets";
import NewCustomers from "./NewCustomers";
import ProductDelivery from "./ProductDelivery";
import TopCategories from "./TopCategories";
import TransitionAlerts from "./AlertMessage";
import { useGetDayEchancesQuery } from "features/Echance/echanceSlice";
import TopProducts from "./TopProducts";
import AlertCharge from "./AlertCharge";
import Notes from "./Notes";

const Dashboard = () => {
  document.title = "Tableau de bord | Radhouani";
  const { data: AllEcheancesForToDay = [] } = useGetDayEchancesQuery();

  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid>
          {AllEcheancesForToDay.length > 0 ? (
            <Row>
              <TransitionAlerts />
            </Row>
          ) : (
            ""
          )}
          <Row>
            <Widgets />

            {/* <TopSalesLocation /> */}
          </Row>
          <Row>
            <Col lg={4}>
              <Row>
                <TopProducts />
              </Row>
              <Row>
                <AlertCharge />
              </Row>
            </Col>
            <Col lg={4}>
              <Revenue />
            </Col>
            <Col lg={4}>
              <Notes />
            </Col>
            {/* <CustomerSatisfaction />
            <ProductDelivery />
            <StockReport /> */}
            {/*<TopCategories />
            <NewCustomers />*/}
          </Row>
          <Row>
            <ProductDelivery />
            <TopCategories />
            <NewCustomers />
          </Row>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
