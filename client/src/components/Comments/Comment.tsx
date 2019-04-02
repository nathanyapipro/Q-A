import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import { Comments_comments_nodes } from "../../types/apollo/Comments";
import { fromNow } from "../../helpers/date";
import { getUsername } from "../../helpers/user";
import UpdateCommentForm from "../../forms/UpdateComment";
import Actions from "./Actions";

interface OwnProps {
  data: Comments_comments_nodes;
  currentUserId: number;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 2}px`,
    "&:first-child": {
      paddingTop: 0
    },
    "&:last-child": {
      paddingBottom: 0
    }
  },
  comment: {
    display: "flex",
    flexDirection: "column",
    maxWidth: "85%",
    width: "100%"
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.grey[200],
    marginBottom: theme.spacing.unit / 4
  },
  isEditing: {
    padding: 0,
    backgroundColor: "transparent"
  },
  content: {},
  isOwner: {
    alignSelf: "flex-end"
  },
  author: {
    fontWeight: theme.typography.fontWeightRegular
  },
  footer: {
    display: "flex",
    flexDirection: "row"
  },
  updatedAt: {},
  spacer: {
    flexGrow: 1
  },
  tip: {
    marginLeft: theme.spacing.unit / 2,
    fontSize: theme.spacing.unit * 1.5,
    marginTop: `-${theme.spacing.unit / 2}px`
  }
}));

function CommentBase(props: Props) {
  const classes = useStyles();

  const { data, currentUserId } = props;

  const { id: commentId, questionId, content, user, updatedAt } = data;

  if (!user) {
    return <noscript />;
  }

  const isOwner = user.id === currentUserId;

  const username = getUsername(user.username, user.role);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  return (
    <div className={classNames(classes.container)}>
      <div
        className={classNames(classes.comment, {
          [classes.isOwner]: isOwner
        })}
      >
        <Typography
          variant="caption"
          color="primary"
          component="p"
          className={classes.author}
        >
          {username}
        </Typography>
        <Paper
          elevation={0}
          className={classNames(classes.paper, {
            [classes.isEditing]: isEditing
          })}
        >
          {isEditing ? (
            <UpdateCommentForm
              commentId={commentId}
              initialValue={content}
              onExit={toggleEdit}
            />
          ) : (
            <Typography
              color="textPrimary"
              variant="body1"
              component="p"
              className={classes.content}
            >
              {content}
            </Typography>
          )}
        </Paper>
        <div className={classes.footer}>
          {isEditing ? (
            <Typography
              className={classes.tip}
              color="textPrimary"
              variant="caption"
            >
              (Press Enter to Save)
            </Typography>
          ) : (
            <Typography
              className={classes.updatedAt}
              color="textPrimary"
              component="span"
              variant="caption"
            >
              {fromNow(updatedAt)}
            </Typography>
          )}
          <div className={classes.spacer} />
          <Actions
            isEditing={isEditing}
            commentId={commentId}
            questionId={questionId}
            userId={user.id}
            onEdit={toggleEdit}
          />
        </div>
      </div>
    </div>
  );
}

const Comment = CommentBase;

export default Comment;
