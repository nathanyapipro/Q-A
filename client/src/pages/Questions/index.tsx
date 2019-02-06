import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import StatusFilter from "../../components/QuestionsFilters/Status";
import TagsFilter from "../../components/QuestionsFilters/Tags";
import QuestionsTable from "../../components/QuestionsTable";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    flexShrink: 0,
    marginBottom: theme.spacing.unit,
    "&>:not(:last-child)": {
      marginRight: theme.spacing.unit
    }
  },
  field: {
    flexBasis: "50%"
  }
}));

function QuestionsBase(_: Props) {
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <div className={classes.field}>
          <StatusFilter />
        </div>
        <div className={classes.field}>
          <TagsFilter />
        </div>
      </div>
      <QuestionsTable />
    </div>
  );
}

const Questions = QuestionsBase;

export default Questions;
