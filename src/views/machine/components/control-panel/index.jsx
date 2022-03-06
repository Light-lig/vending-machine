import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useShop } from "../../../../store/ShopProvider";

export default function BasicCard() {
  const { state, dispatch } = useShop();
  const { cash } = state;
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(parseFloat(e.target.value));
  };

  const updateMoney = () => {
    if (value !== "") {
      dispatch({
        type: "UPDATE_MONEY",
        item: parseFloat(cash + value),
      });
      setValue(0.0);
    }
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Amount
        </Typography>
        <Typography variant="h5" component="div">
          ${cash}
        </Typography>

        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          InputLabelProps={{
            shrink: true,
          }}
          type="number"
          value={value}
          onChange={handleChange}
        />
        <Button variant="contained" onClick={updateMoney}>
          Add money
        </Button>
      </CardContent>
      <CardActions></CardActions>
    </Card>
  );
}
