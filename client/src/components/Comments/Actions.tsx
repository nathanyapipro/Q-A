import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { compose } from "react-apollo";
import * as withDeleteCommentByIdMutation from "../../queries/withDeleteCommentByIdMutation";

interface OwnProps {
  commentId: number;
  onEdit: () => void;
}

type Props = OwnProps & withDeleteCommentByIdMutation.ChildProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row"
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

function CommentBase(props: Props) {
  const classes = useStyles();

  const { commentId, deleteComment, onEdit } = props;

  function handleEditClick(_: React.MouseEvent) {
    onEdit();
  }

  function handleDeleteClick(_: React.MouseEvent) {
    deleteComment({
      variables: {
        deleteCommentByIdInput: {
          id: commentId
        }
      }
    });
  }

  return (
    <div className={classes.container}>
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
  );
}

const Comment: React.ComponentType<
  OwnProps & withDeleteCommentByIdMutation.InputProps
> = compose(withDeleteCommentByIdMutation.hoc)(CommentBase);

export default Comment;