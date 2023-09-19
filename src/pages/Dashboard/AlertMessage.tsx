import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { useGetDayEchancesQuery } from "features/Echance/echanceSlice";
import { Link } from "react-router-dom";
import { Card, Col } from "react-bootstrap";

export default function TransitionAlerts() {
  const [open, setOpen] = React.useState(true);
  const { data = [] } = useGetDayEchancesQuery();
  return (
    <Box sx={{ width: "100%" }}>
      <Collapse in={open}>
        <Alert
          severity="warning"
          action={
            <IconButton
              aria-label="close"
              color="warning"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <i className="bi bi-x-lg text-dark label-icon bg-opacity-10 align-middle rounded fs-16 me-2 justify-content-end"></i>
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Vous avez des délais aujourd'hui, contactez vos clients !{" "}
          <Link to="/echeances">Détails</Link>
        </Alert>
      </Collapse>
    </Box>

    // <Link
    //   to="#"
    //   className="card-animate mb-3 btn bg-warning bg-opacity-25 btn-label btn-hover rounded"
    // >
    //   <div>
    //     <i className="bi bi-exclamation-triangle text-warning label-icon bg-opacity-10 align-middle rounded fs-22 me-2"></i>{" "}
    //     Vous avez des délais aujourd'hui, contactez vos clients !{" "}
    //   </div>
    // </Link>
    // <div className="d-flex">
    //   <i className="bi bi-x-lg text-warning label-icon bg-opacity-10 align-middle rounded fs-22 me-2 justify-content-end"></i>{" "}
    // </div>
  );
}
