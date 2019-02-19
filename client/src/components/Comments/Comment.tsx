import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import { Comments_comments_nodes } from "../../types/apollo/Comments";
import { RoleType } from "../../types/apollo";
import { fromNow } from "../../helpers/date";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateCommentForm from "../../forms/UpdateComment";

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
    width: "max-content"
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.grey[200]
  },
  content: {},
  isOwner: {
    alignSelf: "flex-end"
  },
  author: {
    fontWeight: 600
  },
  footer: {
    display: "flex",
    flexDirection: "row"
  },
  createdAt: {},
  editButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: theme.palette.primary.main,
    cursor: "pointer",
    width: theme.spacing.unit * 6,
    marginLeft: theme.spacing.unit
  },
  icon: {
    height: "16px",
    width: "16px",
    marginRight: theme.spacing.unit
  },
  button: {
    minHeight: "unset",
    padding: 0,
    marginLeft: theme.spacing.unit,
    textTransform: "unset"
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

  if (user.role.role === RoleType.ANONYMOUS) {
    username = username.slice(10, 18);
  }

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function handleEditClick(_: React.MouseEvent) {
    if (!isEditing) {
      toggleEdit();
    }
  }

  function handleDeleteClick(_: React.MouseEvent) {
    // if (!isEditing) {
    //   toggleEdit();
    // }
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
        <Paper elevation={0} className={classNames(classes.paper)}>
          {isEditing ? (
            <UpdateCommentForm
              commentId={id}
              initialValue={content}
              onExit={toggleEdit}
            />
          ) : (
            <Typography
              color="inherit"
              variant="body2"
              component="p"
              className={classes.content}
            >
              {content}
            </Typography>
          )}
        </Paper>
        <div className={classes.footer}>
          <Typography
            className={classes.createdAt}
            component="span"
            variant="caption"
          >
            {fromNow(createdAt)}
          </Typography>
          <Button
            variant="text"
            color="primary"
            onClick={handleEditClick}
            className={classes.button}
            size="small"
            disableFocusRipple
          >
            <EditIcon color="inherit" className={classes.icon} />
            Edit
          </Button>
          <Button
            variant="text"
            color="secondary"
            onClick={handleDeleteClick}
            className={classes.button}
            size="small"
            disableFocusRipple
          >
            <DeleteIcon color="inherit" className={classes.icon} />
            delete
          </Button>
        </div>
      </div>
    </div>
  );
}

const Conversation = ConversationBase;

export default Conversation;
