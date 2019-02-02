import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import NewIcon from "@material-ui/icons/NewReleases";
import UnderReviewIcon from "@material-ui/icons/RateReview";
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
  }
}));

function StatusBase(props: Props) {
  const classes = useStyles({});
  const { status } = props;
  let icon: React.ReactNode;
  switch (status) {
    case QuestionStatus.NEW:
      icon = <NewIcon color="secondary" />;
      break;
    case QuestionStatus.UNDER_REVIEW:
      icon = <UnderReviewIcon color="secondary" />;
      break;
    case QuestionStatus.ANSWERED:
      icon = <AnsweredIcon color="secondary" />;
      break;
  }

  return <div className={classes.container}>{icon}</div>;
}

const Status = StatusBase;

export default Status;
