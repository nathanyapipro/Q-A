import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import NewIcon from "@material-ui/icons/NewReleases";
import UnderReviewIcon from "@material-ui/icons/SupervisedUserCircle";
import AnsweredIcon from "@material-ui/icons/CheckCircle";
import DismissedIcon from "@material-ui/icons/Block";
import { StatusNameType } from "../types/apollo";
import { Theme } from "@material-ui/core/styles";

interface OwnProps {
  status: StatusNameType;
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
    case StatusNameType.NEW:
      return <NewIcon className={classes.icon} color="inherit" />;
    case StatusNameType.UNDER_REVIEW:
      return <UnderReviewIcon className={classes.icon} color="inherit" />;
    case StatusNameType.ANSWERED:
      return <AnsweredIcon className={classes.icon} color="inherit" />;
    case StatusNameType.DISMISSED:
      return <DismissedIcon className={classes.icon} color="inherit" />;
  }
}

const Status = StatusBase;

export default Status;
