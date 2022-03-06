import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

import { useShop } from "../../../../store/ShopProvider";

export default function ButtonAppBar() {
  
  const { state } = useShop();
  const { shop } = state;

  const getTotal = () => {
    const initialValue = 0;
    const total = shop.reduce(
      (total, currentValue) => total + currentValue.price,
      initialValue
    );
    return total;
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vending Machine
          </Typography>
          <Button color="inherit">Total: ${getTotal()}</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
