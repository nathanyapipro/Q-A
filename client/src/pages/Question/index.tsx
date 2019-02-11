import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { RouteComponentProps } from "react-router-dom";
import QuestionById from "../../components/Question";

interface OwnProps {}

export type QuestionRouteProps = RouteComponentProps<{
  id: string;
}>;

type Props = OwnProps & QuestionRouteProps;

const useStyles = makeStyles((_: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1
  },
  question: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
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
    <div className={classes.container}>
      <div className={classes.question}>
        <QuestionById questionId={parseInt(id, 10)} />
      </div>
      <div className={classes.comments}>Comments</div>
    </div>
  );
}

const Question = QuestionBase;

export default Question;
