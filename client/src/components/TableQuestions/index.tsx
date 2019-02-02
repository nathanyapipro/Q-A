import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { questions } from "../../queries";
import { Query } from "react-apollo";
import {
  QuestionsVariables,
  Questions as QuestionQueryData
} from "../../types/Questions";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
// import Header from "./Header";
import Row from "./Row";

class QuestionsQuery extends Query<QuestionQueryData, QuestionsVariables> {}

interface TableQuestionProps {}

type Props = TableQuestionProps;

const useStyles = makeStyles(_ => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0
  },
  table: {
    tableLayout: "fixed"
  },
  emptyRow: {}
}));

function TableQuestionBase(_: Props) {
  const classes = useStyles({});

  return (
    <Paper className={classes.container}>
      <Table className={classes.table}>
        <TableBody>
          <QuestionsQuery
            query={questions}
            variables={{
              first: 10,
              offset: 0
            }}
          >
            {({ data }) => {
              if (!data || !data.questions || !data.questions.nodes) {
                return (
                  <TableRow className={classes.emptyRow}>
                    <TableCell>No Data</TableCell>
                  </TableRow>
                );
              }

              const rows = data.questions.nodes;

              return rows.map(data => (
                <Row key={`row-${data.id}`} data={data} />
              ));
            }}
          </QuestionsQuery>
        </TableBody>
      </Table>
    </Paper>
  );
}

const TableQuestion = TableQuestionBase;

export default TableQuestion;
