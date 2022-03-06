import React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import Product from "./components/product";
import ControlPanel from "./components/control-panel";
import Header from "./components/header";
import { useShop } from "../../store/ShopProvider";
import "./styles.css";

const back = { height: 700, overflowY: "scroll" };
export default function BasicGrid() {
  const { state } = useShop();
  const {products} = state;

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid item xs={12}>
        <Header />
      </Grid>
      <Grid container spacing={2}>
        <Grid container xs={10} style={back}>
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 3, sm: 3, md: 12 }}
            p={4}
          >
            {products.length > 0 ? (
              products.map((item, index) => (
                <Grid item xs={3} sm={3} md={4} key={index}>
                  <Product product={item} dispatched={false} />
                </Grid>
              ))
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Grid>
        <Grid item xs={2} p={4}>
          <ControlPanel />
        </Grid>
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
              <h2>empty</h2>
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
