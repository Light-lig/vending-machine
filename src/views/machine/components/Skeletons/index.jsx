import * as React from "react";
import Skeleton from "@mui/material/Skeleton";
import Grid from "@mui/material/Grid";

export default function SkeletonColor() {

  const skeletons = [1, 2, 3, 4, 5, 6, 3, 3, 3];

  return skeletons.map((i) => (
    <Grid item xs={3} sm={3} md={3}>
      <Skeleton
        sx={{ bgcolor: "grey.500" }}
        variant="rectangular"
        style={{ width: "100%", height: "100%" }}
      />
    </Grid>
  ));
}
