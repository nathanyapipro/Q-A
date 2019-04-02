import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { StatusType } from "../../types/apollo";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import StatusIcon from "../StatusIcon";
import { getStatusLabel, getStatusColor } from "../../helpers/question";
import Typography from "@material-ui/core/Typography";

interface OwnProps {
  status: StatusType;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    color: theme.palette.primary.contrastText,
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit}px`,
    width: "max-content"
  },
  label: {
    display: "flex",
    flexShrink: 0,
    fontWeight: theme.typography.fontWeightMedium,
    marginLeft: theme.spacing.unit
  }
}));

function StatusBase(props: Props) {
  const classes = useStyles();
  const { status } = props;
  const backgroundColor = getStatusColor(status);
  return (
    <Paper
      elevation={1}
      style={{ backgroundColor }}
      className={classes.container}
    >
      <StatusIcon status={status} />
      <Typography className={classes.label} color="inherit" variant="body1">
        {getStatusLabel(status)}
      </Typography>
    </Paper>
  );
}

const Status = StatusBase;

export default Status;
