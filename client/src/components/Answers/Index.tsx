import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Responses from "./Responses";
import CreateAnswerForm from "../../forms/CreateAnswer";
import AddIcon from "@material-ui/icons/Add";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

interface OwnProps {
  questionId: number;
}

type Props = OwnProps;

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
    padding: 0,
    marginLeft: theme.spacing.unit,
    textTransform: "unset"
  }
}));

function AnswersBase(props: Props) {
  const { questionId } = props;
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

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography
          className={classes.label}
          color="secondary"
          variant="caption"
        >
          Ansers
        </Typography>
        {!isAdding && (
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
      <Responses questionId={questionId} />
      {isAdding && (
        <CreateAnswerForm questionId={questionId} onExit={toggleAdd} />
      )}
    </div>
  );
}

const Answers = AnswersBase;

export default Answers;
