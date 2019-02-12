import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import InputBase from "@material-ui/core/InputBase";

interface OwnProps {}

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
  }
}));

function CommentsBase(_: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.conversation}>Conversation</div>
      <div className={classes.input}>
        <InputBase
          fullWidth
          autoFocus
          multiline
          rowsMax="4"
          placeholder="Write a comment ... "
          value={""}
          onChange={console.log}
        />
      </div>
    </div>
  );
}

const Comments = CommentsBase;

export default Comments;
