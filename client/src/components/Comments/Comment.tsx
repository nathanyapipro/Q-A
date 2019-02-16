import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import { Comments_comments_nodes } from "../../types/apollo/Comments";

interface OwnProps {
  data: Comments_comments_nodes;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing.unit * 2
  },
  comment: {
    color: theme.palette.secondary.contrastText,
    padding: theme.spacing.unit,
    width: "90%",
    backgroundColor: theme.palette.secondary.main
  },
  isOwner: {
    color: theme.palette.primary.contrastText,
    backgroundColor: theme.palette.primary.main,
    alignSelf: "flex-end"
  },
  bold: {
    fontWeight: 600
  }
}));

function ConversationBase(props: Props) {
  const classes = useStyles();

  const { data } = props;

  const { id, content, user, createdAt } = data;

  if (!user) {
    return <noscript />;
  }

  const isOwner = user.id === 2;

  console.log(id, content, user, createdAt);

  return (
    <div className={classes.container}>
      <Paper
        elevation={1}
        className={classNames(classes.comment, {
          [classes.isOwner]: isOwner
        })}
      >
        <Typography
          className={classes.bold}
          color="inherit"
          variant="body2"
          component="p"
        >
          {content}
        </Typography>
      </Paper>
    </div>
  );
}

const Conversation = ConversationBase;

export default Conversation;
