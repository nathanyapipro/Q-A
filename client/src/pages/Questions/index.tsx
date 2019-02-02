import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TableQuestions from "../../components/TableQuestions";

interface QuestionsProps {}

type Props = QuestionsProps;

const useStyles = makeStyles(_ => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    flexDirection: "row"
  },
  filters: {
    display: "flex",
    flexDirection: "row"
  }
}));

function QuestionsBase(_: Props) {
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <div className={classes.header}>Desc, Search, Sort, Create</div>
      <div className={classes.filters}>Filters</div>
      <TableQuestions />
    </div>
  );
}

const Questions = QuestionsBase;

export default Questions;
