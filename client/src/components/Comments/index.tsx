import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Conversation from "./Conversation";
import Input from "./Input";

interface OwnProps {
  questionId: number;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    flexBasis: "50%"
  },
  conversation: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  },
  input: {
    display: "flex",
    flexDirection: "column",
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
    borderTop: `1px solid ${theme.palette.divider}`
  },
  field: {
    marginTop: 0,
    marginBottom: 0
  }
}));

function CommentsBase(props: Props) {
  const { questionId } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Conversation questionId={questionId} />
      <Input questionId={questionId} />
    </div>
  );
}

const Comments = CommentsBase;

export default Comments;
