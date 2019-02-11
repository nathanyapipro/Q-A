import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { RouteComponentProps } from "react-router-dom";
import QuestionById from "../../components/Question";

interface OwnProps {}

export type QuestionRouteProps = RouteComponentProps<{
  id: string;
}>;

type Props = OwnProps & QuestionRouteProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    padding: theme.spacing.unit * 2
  },
  divider: {
    display: "flex",
    minHeight: "100%",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2,
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  comments: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexShrink: 0,
    flexBasis: "50%"
  }
}));

function QuestionBase(props: Props) {
  const classes = useStyles();

  const {
    match: {
      params: { id }
    }
  } = props;

  return (
    <Paper elevation={1} className={classes.container}>
      <QuestionById questionId={parseInt(id, 10)} />
      <div className={classes.divider} />
      <div className={classes.comments}>Comments</div>
    </Paper>
  );
}

const Question = QuestionBase;

export default Question;
