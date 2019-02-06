import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import NewIcon from "@material-ui/icons/NewReleases";
import UnderReviewIcon from "@material-ui/icons/SupervisedUserCircle";
import AnsweredIcon from "@material-ui/icons/CheckCircle";
import { StatusNameType } from "../types/apollo";

interface OwnProps {
  name: StatusNameType;
}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
  container: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px ${theme
      .spacing.unit / 2}px ${theme.spacing.unit}px`
  },
  icon: {
    height: "1.1em",
    width: "1.1em"
  }
}));

function StatusBase(props: Props) {
  const classes = useStyles({});
  const { name } = props;
  let icon: React.ReactNode;
  switch (name) {
    case StatusNameType.NEW:
      icon = <NewIcon className={classes.icon} style={{ color: "#7D55D7" }} />;
      break;
    case StatusNameType.UNDER_REVIEW:
      icon = (
        <UnderReviewIcon
          className={classes.icon}
          style={{ color: "#3A79E2" }}
        />
      );
      break;
    case StatusNameType.ANSWERED:
      icon = (
        <AnsweredIcon className={classes.icon} style={{ color: "#3CBB53" }} />
      );
      break;
  }

  return <div className={classes.container}>{icon}</div>;
}

const Status = StatusBase;

export default Status;
