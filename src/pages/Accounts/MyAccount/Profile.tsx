import React from "react";
import { Card, Col, Dropdown, Row, Table } from "react-bootstrap";
import Acitivity from "./Acitivity";
import RecentOrders from "./RecentOrders";
import { Link } from "react-router-dom";

// Import Images
import img1 from "assets/images/users/avatar-1.jpg";

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
