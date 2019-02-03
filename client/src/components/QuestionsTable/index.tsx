import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { questions } from "../../queries";
import { Query } from "react-apollo";
import {
  QuestionsVariables,
  Questions as QuestionsQueryData
} from "../../types/queries/Questions";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Row from "./Row";

class QuestionsQuery extends Query<QuestionsQueryData, QuestionsVariables> {}

interface QuestionsTableProps {}

type Props = QuestionsTableProps;

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

function QuestionsTableBase(_: Props) {
  const classes = useStyles({});

  return (
    <Paper elevation={1} className={classes.container}>
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

const QuestionsTable = QuestionsTableBase;

export default QuestionsTable;
