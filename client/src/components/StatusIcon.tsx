import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import NewIcon from "@material-ui/icons/NewReleases";
import UnderReviewIcon from "@material-ui/icons/SupervisedUserCircle";
import AddressedIcon from "@material-ui/icons/CheckCircle";
import DismissedIcon from "@material-ui/icons/RemoveCircle";
import { StatusType } from "../types/apollo";
import { Theme } from "@material-ui/core/styles";

interface OwnProps {
  status: StatusType;
}

type Props = OwnProps;

const useStyles = makeStyles((_: Theme) => ({
  icon: {
    height: "0.7em",
    width: "0.7em"
  }
}));

function StatusBase(props: Props) {
  const classes = useStyles();
  const { status } = props;
  switch (status) {
    case StatusType.NEW:
      return <NewIcon className={classes.icon} color="inherit" />;
    case StatusType.UNDER_REVIEW:
      return <UnderReviewIcon className={classes.icon} color="inherit" />;
    case StatusType.ADDRESSED:
      return <AddressedIcon className={classes.icon} color="inherit" />;
    case StatusType.DISMISSED:
      return <DismissedIcon className={classes.icon} color="inherit" />;
  }
}

const Status = StatusBase;

export default Status;
