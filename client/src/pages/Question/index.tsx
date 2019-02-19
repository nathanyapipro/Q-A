import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { RouteComponentProps } from "react-router-dom";
import QuestionById from "../../components/Question";
import Comments from "../../components/Comments";

interface OwnProps {}

export type QuestionRouteProps = RouteComponentProps<{
  id: string;
}>;

type Props = OwnProps & QuestionRouteProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    [theme.breakpoints.up("sm")]: {
      flexDirection: "row"
    }
  },
  divider: {
    display: "flex",
    borderTop: `1px solid ${theme.palette.divider}`,
    [theme.breakpoints.up("sm")]: {
      borderTop: "unset",
      minHeight: "100%",
      borderLeft: `1px solid ${theme.palette.divider}`
    }
  }
}));

function QuestionBase(props: Props) {
  const classes = useStyles();

  const {
    match: {
      params: { id }
    }
  } = props;

  if (!id) {
    return <noscript />;
  }

  return (
    <Paper elevation={1} className={classes.container}>
      <QuestionById questionId={parseInt(id, 10)} />
      <div className={classes.divider} />
      <Comments questionId={parseInt(id, 10)} />
    </Paper>
  );
}

const Question = QuestionBase;

export default Question;
