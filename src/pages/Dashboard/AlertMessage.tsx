import * as React from "react";
import Box from "@mui/material/Box";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import Collapse from "@mui/material/Collapse";
import { useGetDayEchancesQuery } from "features/Echance/echanceSlice";

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
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              x
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          Vous avez des délais aujourd'hui, contactez vos clients !
        </Alert>
      </Collapse>
    </Box>
  );
}
