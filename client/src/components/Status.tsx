import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import NewIcon from "@material-ui/icons/NewReleases";
import UnderReviewIcon from "@material-ui/icons/SupervisedUserCircle";
import AnsweredIcon from "@material-ui/icons/CheckCircle";
import { StatusNameType } from "../types/apollo";
import { Theme } from "@material-ui/core/styles";

interface OwnProps {
  name: StatusNameType;
}

type Props = OwnProps;

const useStyles = makeStyles((_: Theme) => ({
  icon: {
    height: "1.1em",
    width: "1.1em"
  }
}));

function StatusBase(props: Props) {
  const classes = useStyles();
  const { name } = props;
  switch (name) {
    case StatusNameType.NEW:
      return <NewIcon className={classes.icon} style={{ color: "#7D55D7" }} />;
    case StatusNameType.UNDER_REVIEW:
      return (
        <UnderReviewIcon
          className={classes.icon}
          style={{ color: "#3A79E2" }}
        />
      );
    case StatusNameType.ANSWERED:
      return (
        <AnsweredIcon className={classes.icon} style={{ color: "#3CBB53" }} />
      );
  }
}

const Status = StatusBase;

export default Status;
