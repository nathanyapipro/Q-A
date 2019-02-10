import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { compose } from "react-apollo";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Row from "./Row";

import {
  withQuestionsQuery,
  WithQuestionsQuery
} from "../../queries/withQuestionsQuery";

interface OwnProps {
  handleChangePage: (page: number) => void;
}

type Props = OwnProps & WithQuestionsQuery;

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

function QuestionsTableBase(props: Props) {
  const classes = useStyles({});
  const {
    data: { nodes, totalCount, offset, first },
    handleChangePage
  } = props;

  function renderRows() {
    if (nodes.length === 0) {
      return (
        <TableRow className={classes.emptyRow}>
          <TableCell>No Data</TableCell>
        </TableRow>
      );
    } else {
      return nodes.map(data => <Row key={`row-${data.id}`} data={data} />);
    }
  }

  function _handleChangePage(
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) {
    handleChangePage(page);
  }

  return (
    <Paper elevation={1} className={classes.container}>
      <Table className={classes.table}>
        <TableBody>{renderRows()}</TableBody>
      </Table>
      <TablePagination
        component="div"
        count={totalCount}
        rowsPerPage={first}
        rowsPerPageOptions={[]}
        page={Math.floor(offset / first)}
        backIconButtonProps={{
          "aria-label": "Previous Page"
        }}
        nextIconButtonProps={{
          "aria-label": "Next Page"
        }}
        onChangePage={_handleChangePage}
      />
    </Paper>
  );
}

const QuestionsTable: React.ComponentType<OwnProps> = compose(
  withQuestionsQuery
)(QuestionsTableBase);

export default QuestionsTable;
