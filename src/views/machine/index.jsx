import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import Product from "./components/product";
import ControlPanel from "./components/control-panel";
import { useShop } from "../../store/ShopProvider";
import "./styles.css";

const back = { height: 700, overflowY: "scroll" };
export default function BasicGrid() {
  const { state } = useShop();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid container xs={10} style={back}  >
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 4, md: 12 }}
           
            p={4}
          >
            {state.data.length > 0 ? (
              state.data.map((item, index) => (
                <Grid item xs={2} sm={4} md={2} key={index}>
                  <Product product={item} dispatched={false} />
                </Grid>
              ))
            ) : (
              <CircularProgress />
            )}
          </Grid>
        </Grid>
        <Grid item xs={2}    p={4}>
          <ControlPanel />
        </Grid>
        <Grid item xs={12} className="cart" p={4}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
            justifyContent="center"
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
              <CircularProgress />
            )}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
}
