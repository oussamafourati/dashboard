import React from "react";
import { Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
const Error = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true} className="text-center justify-content-center">
          <p>Ooops Somthing went wrong!!</p>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Error;
