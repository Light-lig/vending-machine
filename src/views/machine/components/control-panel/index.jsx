import React, { useState } from "react";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";

import { useShop } from "../../../../store/ShopProvider";

export default function BasicCard() {
  const { state, dispatch } = useShop();
  const [value, setValue] = useState(0);

  const handleChange = (e) => {
    setValue(parseFloat(e.target.value));
  };

  const updateMoney = () => {
    dispatch({ type: "UPDATE_MONEY", item: parseFloat(state.money + value) });
    setValue(0.0);
  };

  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Amount
        </Typography>
        <Typography variant="h5" component="div">
          {state.money}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          adjective
        </Typography>
        <TextField
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
          value={value}
          onChange={handleChange}
          onBlur={updateMoney}
        />
      </CardContent>
      <CardActions>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Turned: {state.turned}
        </Typography>
      </CardActions>
    </Card>
  );
}
