import React from "react";
import { Col, Row } from "react-bootstrap";
import RecentOrders from "./RecentOrders";

const Profile = () => {
  return (
    <React.Fragment>
      <Row>
        <Col xxl={12}>
          <RecentOrders />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Profile;
