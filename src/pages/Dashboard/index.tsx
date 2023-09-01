import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Revenue from "./Revenue";
import Widgets from "./Widgets";
import NewCustomers from "./NewCustomers";
import ProductDelivery from "./ProductDelivery";
import TopCategories from "./TopCategories";
import TransitionAlerts from "./AlertMessage";
import { useGetDayEchancesQuery } from "features/Echance/echanceSlice";

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
            <Col xxl={12} lg={6} className="order-first">
              <Row className="row-cols-xxl-5 row-cols-1">
                <Widgets />
              </Row>
            </Col>
            {/* <TopSalesLocation /> */}
          </Row>
          <Row className="widget-responsive-fullscreen">
            <Revenue />
            {/* <CustomerSatisfaction />
            <ProductDelivery />
            <StockReport /> */}
            {/*<TopCategories />
            <NewCustomers />
            <TopProducts /> */}
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
