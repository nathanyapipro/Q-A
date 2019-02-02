import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import NewIcon from "@material-ui/icons/NewReleases";
import UnderReviewIcon from "@material-ui/icons/SupervisedUserCircle";
import AnsweredIcon from "@material-ui/icons/CheckCircle";
import { QuestionStatus } from "../types/index";

interface StatusProps {
  status: QuestionStatus;
}

type Props = StatusProps;

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
  const { status } = props;
  let icon: React.ReactNode;
  switch (status) {
    case QuestionStatus.NEW:
      icon = <NewIcon className={classes.icon} style={{ color: "#7D55D7" }} />;
      break;
    case QuestionStatus.UNDER_REVIEW:
      icon = (
        <UnderReviewIcon
          className={classes.icon}
          style={{ color: "#3A79E2" }}
        />
      );
      break;
    case QuestionStatus.ANSWERED:
      icon = (
        <AnsweredIcon className={classes.icon} style={{ color: "#3CBB53" }} />
      );
      break;
  }

  return <div className={classes.container}>{icon}</div>;
}

const Status = StatusBase;

export default Status;
