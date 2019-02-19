import * as React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import EditIcon from "@material-ui/icons/Create";
import DeleteIcon from "@material-ui/icons/Delete";
import { compose } from "react-apollo";
import * as withDeleteAnswerByIdMutation from "../../queries/withDeleteAnswerByIdMutation";

interface OwnProps {
  answerId: number;
  isEditing?: boolean;
  onEdit: () => void;
}

type Props = OwnProps & withDeleteAnswerByIdMutation.ChildProps;

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

function AnswerBase(props: Props) {
  const classes = useStyles();

  const { answerId, deleteAnswer, onEdit, isEditing } = props;

  function handleEditClick(_: React.MouseEvent) {
    onEdit();
  }

  function handleDeleteClick(_: React.MouseEvent) {
    deleteAnswer({
      variables: {
        deleteAnswerByIdInput: {
          id: answerId
        }
      }
    });
  }

  return (
    <div
      className={classNames(classes.container, {
        [classes.isEditing]: Boolean(isEditing)
      })}
    >
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
        Delete
      </Button>
    </div>
  );
}

const Answer: React.ComponentType<
  OwnProps & withDeleteAnswerByIdMutation.InputProps
> = compose(withDeleteAnswerByIdMutation.hoc)(AnswerBase);

export default Answer;
