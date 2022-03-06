import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Alert  from "@mui/material/Alert";
import Drawer  from "@mui/material/Drawer";
import Stack  from "@mui/material/Stack";

import Product from "./components/product";
import ControlPanel from "./components/control-panel";
import Header from "./components/header";
import { useShop } from "../../store/ShopProvider";
import Loaders from "./components/Skeletons";
import "./styles.css";

const backGroundStyle = { height: 800, overflowY: "scroll" };
export default function BasicGrid() {

  const { state, dispatch } = useShop();
  const { products, openCart } = state;

  const closeCart = () =>{
    dispatch({
      type:"OPEN_CART",
      item:false
    })
  }
  return (
    <Stack spacing={2}>
              <Header />

    <Box sx={{ flexGrow: 1 }} >
      
      <Grid container spacing={2}>
        <Grid container xs={10} style={backGroundStyle}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
            p={4}
          >
            {products.length > 0 ? (
              products.map((item, index) => (
                <Grid item xs={3} sm={12} md={3} key={index}>
                  <Product product={item} dispatched={false} />
                </Grid>
              ))
            ) : (
              <Loaders />
            )}
          </Grid>
        </Grid>
        <Grid item xs={2} p={4}>
          <ControlPanel />
        </Grid>
        <Drawer
            anchor="bottom"
            open={openCart}
            onClose={closeCart}
          >
              <Grid item xs={12} className="cart" p={4} spacing={2}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
            justifyContent="center"
            style={{ height: "100%" }}
            direction="row"
            alignItems="center"
          >
            {state.shop.length > 0 ? (
              state.shop.map((item, index) => (
                <Grid item key={index}>
                  <Product product={item} dispatched={true} />
                </Grid>
              ))
            ) : (
              <Alert severity="info">Empty!</Alert>

            )}
          </Grid>
        </Grid>
          </Drawer>
     
      </Grid>
    </Box>
    </Stack>
  );
}
