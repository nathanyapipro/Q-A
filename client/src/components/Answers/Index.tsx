import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Responses from "./Responses";

interface OwnProps {
  questionId: number;
}

type Props = OwnProps;

const useStyles = makeStyles((_: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  }
}));

function AnswersBase(props: Props) {
  const { questionId } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Responses questionId={questionId} />
    </div>
  );
}

const Answers = AnswersBase;

export default Answers;
