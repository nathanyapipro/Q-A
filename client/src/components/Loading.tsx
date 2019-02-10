import * as React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flex: "1 1 auto",
    justifyContent: "center",
    alignItems: "center",
    padding: theme.spacing.unit * 3
  }
}));

function Loading() {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CircularProgress />
    </div>
  );
}

export default Loading;
