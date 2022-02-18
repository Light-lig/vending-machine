import React, { useState } from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import CircularProgress from "@mui/material/CircularProgress";

import { useShop } from "../../../../store/ShopProvider";
export default function MediaCard(props) {
  const { dispatch } = useShop();
  const [loading, setLoading] = useState(false);

  const shop = () => {
    setLoading(true);
    setTimeout(() => {
      dispatch({ type: "UPDATE_SHOP", item: props.product });
      setLoading(false);
    }, props.product.preparation_time * 100);
  };

  const getSeconds = (time) => {
    return (time * 100) / 1000;
  };

  return (
    <Card sx={{ maxWidth: 300 }}    
    >
      <CardMedia
        component="img"
        height="200"
        image={props.product.thumbnail}
        alt={props.product.name}
      />
      {
          props.dispatched ? <></>:<CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {props.product.name}
          </Typography>
          <Typography variant="overline" display="block" gutterBottom>
            Preparation time: {getSeconds(props.product.preparation_time)} s
          </Typography>
          {loading ? <CircularProgress /> : <></>}
        </CardContent>
      }
      <CardActions>
        {props.dispatched ? (
          <Button
            size="small"
            onClick={() => dispatch({ type: "PULL_SHOP", item: props.product })}
          >
            pull
          </Button>
        ) : (
          <Button size="small" onClick={shop}>
            Share
          </Button>
        )}
      </CardActions>
    </Card>
  );
}
