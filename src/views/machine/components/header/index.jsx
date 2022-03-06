import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useShop } from "../../../../store/ShopProvider";
import './styles.css'
export default function ButtonAppBar() {
  
  const { state, dispatch } = useShop();
  const { shop } = state;
  const count = shop.length;
  const getTotal = () => {
    const initialValue = 0;
    const total = shop.reduce(
      (total, currentValue) => total + currentValue.price,
      initialValue
    );
    return total;
  };
  const openCart = () =>{
    dispatch({
      type:"OPEN_CART",
      item:true
    })
  }
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Vending Machine
          </Typography>
          <Button color="inherit">Total: ${getTotal()}</Button>
          <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              color="inherit"
              onClick={openCart}
            >
              <span className="count">{count}</span>
              <ShoppingCartIcon />
            </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
