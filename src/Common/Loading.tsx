import React from "react";
import { Container } from "react-bootstrap";
import Skeleton from "@mui/material/Skeleton";
const Loading = () => {
  return (
    <React.Fragment>
      <div className="page-content">
        <Container fluid={true} className="justify-content-center">
          <Skeleton variant="rectangular" width={210} height={118} />
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Loading;
