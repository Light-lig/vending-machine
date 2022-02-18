import React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

import Product from "./components/product";
import { useShop } from "../../store/ShopProvider";
import './styles.css'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#1A2027",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));
const back = {  backgroundColor: "#1A2027",height:'80%',overflowY:'scroll'}
export default function BasicGrid() {
  const { state } = useShop();

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
        <Grid item xs={11} style={back} >
          <Grid
            container
            spacing={{ xs: 2, md: 2 }}
            columns={{ xs: 4, sm: 4, md: 12 }}
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
        <Grid item xs={1} style={{backgroundColor: "#1A2027"}} >
                <Item>hola</Item>
        </Grid>
        <Grid item xs={12}  className='cart'>
        <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 12, sm: 12, md: 12 }}
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
