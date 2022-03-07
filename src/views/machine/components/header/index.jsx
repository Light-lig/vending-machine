import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';

import { useShop } from "../../../../store/ShopProvider";
import "./styles.css";

export default function ButtonAppBar() {

  const { state, dispatch } = useShop();
  const { shop } = state;
  const count = shop.length;

  const initialValue = 0;
  const total = shop.reduce(
    (total, currentValue) => total + currentValue.price,
    initialValue
  );
 

  const openCart = () => {
    dispatch({
      type: "OPEN_CART",
      item: true,
    });
  };
  
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vending Machine
          </Typography>
          <Button color="inherit">Total: ${total}</Button>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-haspopup="true"
            color="inherit"
            onClick={openCart}
          >
            <span className="count">{count}</span>
            <ShoppingBagIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
