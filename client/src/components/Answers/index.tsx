import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Responses from "./Responses";
import CreateAnswerForm from "../../forms/CreateAnswer";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { CurrentUser } from "../../states/global/reducer";
import { RoleType } from "../../types/apollo";
import { compose } from "react-apollo";

type ReduxStateProps = {
  currentUser?: CurrentUser;
};

interface OwnProps {
  questionId: number;
}

type Props = OwnProps & ReduxStateProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0
  },
  header: {
    display: "flex",
    flexDirection: "row",
    color: "inherit"
  },
  label: {
    flexGrow: 1,
    pointerEvents: "none"
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
  }
}));

function AnswersBase(props: Props) {
  const { questionId, currentUser } = props;
  const classes = useStyles();

  const [isAdding, setIsAdd] = React.useState<boolean>(false);

  function toggleAdd() {
    setIsAdd(!isAdding);
  }

  function handleAddClick(_: React.MouseEvent) {
    if (!isAdding) {
      toggleAdd();
    }
  }

  if (!currentUser) {
    return <noscript />;
  }

  const canAddAnswer = currentUser.role !== RoleType.ANONYMOUS;

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography
          className={classes.label}
          color="secondary"
          variant="caption"
        >
          Answers
        </Typography>
        {canAddAnswer && !isAdding && (
          <Button
            variant="text"
            color="primary"
            onClick={handleAddClick}
            className={classes.button}
            size="small"
            disableFocusRipple
          >
            <AddIcon color="inherit" className={classes.icon} />
            Add
          </Button>
        )}
      </div>
      <Responses questionId={questionId} isAdding={isAdding} />
      {isAdding && (
        <CreateAnswerForm questionId={questionId} onExit={toggleAdd} />
      )}
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    currentUser: state.global.auth.currentUser
  };
};

const Answers: React.ComponentType<OwnProps> = compose(
  connect(
    mapStateToProps,
    {}
  )
)(AnswersBase);

export default Answers;
