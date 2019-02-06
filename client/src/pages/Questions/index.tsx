import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Header from "./Header";
import QuestionsTable from "../../components/QuestionsTable";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles(_ => ({
  container: {
    display: "flex",
    flexDirection: "column"
  }
}));

function QuestionsBase(_: Props) {
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <Header />
      <QuestionsTable />
    </div>
  );
}

const Questions = QuestionsBase;

export default Questions;
