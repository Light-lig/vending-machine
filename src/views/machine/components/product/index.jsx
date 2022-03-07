import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

import merchant from "./stranger.png";
import { useShop } from "../../../../store/ShopProvider";
import "./styles.css";

export default function MediaCard(props) {

  const { dispatch, state } = useShop();
  const { cash } = state;
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [merchanderQuotes,setQuotes] = useState("Not enough cash, stranger!")
  const [alertTypes, setTypes] = useState("info")

  const shop = () => {
    if (cash < props.product.price) {
      setQuotes("Not enough cash, stranger!")
      setTypes("info");
      setOpen(true);
      return;
    }
    setLoading(true);
    dispatch({
      type: "UPDATE_MONEY",
      item: parseFloat(cash - props.product.price),
    });

    setTimeout(() => {
      dispatch({
        type: "UPDATE_SHOP",
        item: props.product,
      });
      setQuotes("Heh heh heh... Thank you!, your order is ready.")
      setTypes("success");
      setOpen(true)
      setLoading(false);
    }, props.product.preparation_time * 100);
  };

  const handleClose = (event, reason) => {
    
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  return (
    <Card sx={{ display: "flex" }}>
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h6">
            {props.product.name}
          </Typography>
          <Typography
            variant="subtitle1"
            color="text.secondary"
            component="div"
          >
            Price: $ {props.product.price}
          </Typography>
        </CardContent>
        <Box sx={{ display: "flex", alignItems: "center", pl: 1, pb: 1 }}>
          {props.dispatched ? (
            <Button
              size="small"
              onClick={() =>
                dispatch({ type: "PULL_SHOP", item: props.product })
              }
            >
              Take
            </Button>
          ) : (
            <Button size="small" onClick={shop}>
              Buy
            </Button>
          )}
          {loading ? <CircularProgress /> : null}
        </Box>
      </Box>
      <CardMedia
        component="img"     
        style={{ height: 190, width: '50%'}}
        image={props.product.thumbnail}
        alt={props.product.name}
      />
      <Snackbar
        open={open}
        onClose={handleClose}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleClose} severity={alertTypes} sx={{ width: "100%" }}>
          {merchanderQuotes}
          <img alt="merchant" src={merchant} className="merchant" />
        </Alert>
      </Snackbar>
    </Card>
  );
}
