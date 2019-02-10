import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import CreateQuestionForm from "./CreateQuestionForm";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((_: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  }
}));

function AskAQuestionBase(_: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <CreateQuestionForm />
    </div>
  );
}

const AskAQuestion = AskAQuestionBase;

export default AskAQuestion;
