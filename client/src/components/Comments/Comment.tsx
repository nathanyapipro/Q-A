import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import { Comments_comments_nodes } from "../../types/apollo/Comments";
import { RoleNameType } from "../../types/apollo";

interface OwnProps {
  data: Comments_comments_nodes;
  currentUserId: number;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    paddingTop: theme.spacing.unit / 2,
    paddingBottom: theme.spacing.unit / 2,
    width: "90%"
  },
  comment: {
    display: "flex",
    flexGrow: 1,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
    backgroundColor: theme.palette.grey[200]
  },
  content: {},
  isOwner: {
    alignSelf: "flex-end"
  },
  author: {
    fontWeight: 600
  }
}));

function ConversationBase(props: Props) {
  const classes = useStyles();

  const { data, currentUserId } = props;

  const { id, content, user, createdAt } = data;

  if (!user) {
    return <noscript />;
  }
  if (!user.role) {
    return <noscript />;
  }

  const isOwner = user.id === currentUserId;

  let username = user.username;

  if (user.role.name === RoleNameType.ANONYMOUS) {
    username = username.slice(10, 18);
  }

  console.log(id, content, user, createdAt);

  return (
    <div
      className={classNames(classes.container, {
        [classes.isOwner]: isOwner
      })}
    >
      <Paper elevation={0} className={classNames(classes.comment)}>
        <Typography
          color="inherit"
          variant="body2"
          component="p"
          className={classes.content}
        >
          {content}
        </Typography>
      </Paper>
      <Typography
        variant="caption"
        color="primary"
        component="p"
        className={classes.author}
      >
        {username}
      </Typography>
    </div>
  );
}

const Conversation = ConversationBase;

export default Conversation;
