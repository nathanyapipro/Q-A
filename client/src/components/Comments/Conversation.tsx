import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  }
}));

function ConversationBase(_: Props) {
  const classes = useStyles();

  return <div className={classes.container}>Conversation</div>;
}

const Conversation = ConversationBase;

export default Conversation;
