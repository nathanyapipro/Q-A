import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { compose } from "react-apollo";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import TablePagination from "@material-ui/core/TablePagination";
import Typography from "@material-ui/core/Typography";
import Row from "./Row";
import { Theme } from "@material-ui/core/styles";
import * as withQuestionsQuery from "../../queries/withQuestionsQuery";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { questionsActions } from "../../states/questions";

type ReduxStateProps = {
  offset: number;
  first: number;
};

interface ReduxDispatchProps {
  setPaginationOffset: (offset: number) => void;
}
interface OwnProps {}

type Props = OwnProps &
  withQuestionsQuery.ChildProps &
  ReduxStateProps &
  ReduxDispatchProps;

const useStyles = makeStyles((_: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    height: "min-content"
  },
  table: {
    tableLayout: "fixed"
  },
  emptyRow: {}
}));

function QuestionsTableBase(props: Props) {
  const classes = useStyles();
  const {
    data: { nodes, totalCount },
    first,
    offset,
    setPaginationOffset
  } = props;

  function renderRows() {
    if (nodes.length === 0) {
      return (
        <TableRow className={classes.emptyRow}>
          <TableCell>
            <Typography color="textSecondary" variant="body1" component="p">
              No Questions found ...
            </Typography>
          </TableCell>
        </TableRow>
      );
    } else {
      return nodes.map(data => <Row key={`question-${data.id}`} data={data} />);
    }
  }

  function _handleChangePage(
    _: React.MouseEvent<HTMLButtonElement, MouseEvent> | null,
    page: number
  ) {
    setPaginationOffset(page * first);
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

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    ...state.questions.pagination
  };
};

const QuestionsTable: React.ComponentType<
  OwnProps & withQuestionsQuery.InputProps
> = compose(
  connect(
    mapStateToProps,
    {
      setPaginationOffset: questionsActions.setPaginationOffset
    }
  ),
  withQuestionsQuery.hoc
)(QuestionsTableBase);

export default QuestionsTable;
