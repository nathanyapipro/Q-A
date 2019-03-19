import * as React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { compose } from "react-apollo";
import * as withDeleteCommentByIdMutation from "../../queries/withDeleteCommentByIdMutation";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { CurrentUser } from "../../states/global/reducer";

type ReduxStateProps = {
  currentUser?: CurrentUser;
};
interface OwnProps {
  userId: number;
  commentId: number;
  isEditing?: boolean;
  onEdit: () => void;
}

type Props = OwnProps &
  withDeleteCommentByIdMutation.ChildProps &
  ReduxStateProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    "&$isEditing": {
      visibility: "hidden",
      pointerEvents: "none"
    }
  },
  icon: {
    height: "16px",
    width: "16px",
    marginRight: theme.spacing.unit
  },
  button: {
    minHeight: "unset",
    minWidth: "unset",
    padding: `0px ${theme.spacing.unit / 2}px`,
    marginLeft: theme.spacing.unit,
    textTransform: "unset"
  },
  isEditing: {}
}));

function CommentBase(props: Props) {
  const classes = useStyles();

  const {
    commentId,
    deleteComment,
    onEdit,
    isEditing,
    currentUser,
    userId
  } = props;

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

  if (!currentUser) {
    return <noscript />;
  }

  const canEditComment = currentUser.id === userId;
  const canDeleteComment = currentUser.id === userId;

  return (
    <div
      className={classNames(classes.container, {
        [classes.isEditing]: Boolean(isEditing)
      })}
    >
      {canEditComment && (
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
      )}
      {canDeleteComment && (
        <Button
          variant="text"
          color="secondary"
          onClick={handleDeleteClick}
          className={classes.button}
          size="small"
          disableFocusRipple
        >
          <DeleteIcon color="inherit" className={classes.icon} />
          Delete
        </Button>
      )}
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    currentUser: state.global.auth.currentUser
  };
};

const Comment: React.ComponentType<
  OwnProps & withDeleteCommentByIdMutation.InputProps
> = compose(
  connect(
    mapStateToProps,
    {}
  ),
  withDeleteCommentByIdMutation.hoc
)(CommentBase);

export default Comment;
