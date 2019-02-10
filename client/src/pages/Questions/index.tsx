import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Filters from "./Filters";
import QuestionsTable from "../../components/QuestionsTable";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import FilterListIcon from "@material-ui/icons/FilterList";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";
import { QuestionsVariables } from "../../types/apollo/Questions";
import Paper from "@material-ui/core/Paper";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  fullWidth: {
    width: "100%"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    padding: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2
  },
  drawerPaper: {
    height: "100%"
  },
  drawerHeader: {},
  drawerContent: {
    padding: theme.spacing.unit * 2
  },
  closeButton: {
    width: theme.spacing.unit * 8,
    height: theme.spacing.unit * 6,
    minWidth: "unset"
  },
  filterButton: {
    width: "100%",
    marginBottom: theme.spacing.unit * 2
  },
  filterButtonIcon: {
    marginRight: theme.spacing.unit * 2
  }
}));

export interface QueryType {
  tagIds: Array<number>;
  statusIds: Array<number>;
  offset: number;
  first: number;
}

function QuestionsBase(_: Props) {
  const classes = useStyles({});

  const [isFiltersOpen, setIsFiltersOpen] = React.useState<boolean>(false);
  const [query, setQuery] = React.useState<QueryType>({
    tagIds: [],
    statusIds: [],
    offset: 0,
    first: 10
  });

  function toggleFilters(_: React.SyntheticEvent<{}, Event>) {
    setIsFiltersOpen(!isFiltersOpen);
  }

  const handleChangePage = (page: number) =>
    setQuery({
      ...query,
      offset: page * query.first
    });

  const queryParams: QuestionsVariables = {
    first: query.first,
    offset: query.offset,
    filter: {
      tagIds: {
        contains: query.tagIds.length > 0 ? query.tagIds : null
      },
      statusId: {
        in: query.statusIds.length > 0 ? query.statusIds : null
      }
    }
  };

  return (
    <div className={classes.container}>
      <Hidden smUp implementation="css">
        <Button
          color="primary"
          variant="contained"
          className={classes.filterButton}
          onClick={toggleFilters}
        >
          <FilterListIcon
            className={classes.filterButtonIcon}
            color="inherit"
          />
          <Typography color="inherit">Filters</Typography>
        </Button>
        <Drawer
          variant="temporary"
          anchor="bottom"
          open={isFiltersOpen}
          onClose={toggleFilters}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          <div className={classes.drawerHeader}>
            <Button
              color="primary"
              disableRipple
              className={classes.closeButton}
              onClick={toggleFilters}
            >
              <CloseIcon color="inherit" />
            </Button>
          </div>
          <Divider />
          <div className={classes.drawerContent}>
            <Filters query={query} setQuery={setQuery} />
          </div>
        </Drawer>
      </Hidden>
      <Hidden className={classes.fullWidth} xsDown implementation="css">
        <Paper className={classes.header}>
          <Filters query={query} setQuery={setQuery} />
        </Paper>
      </Hidden>
      {
        //@ts-ignore
        <QuestionsTable
          {...queryParams}
          //@ts-ignore
          handleChangePage={handleChangePage}
        />
      }
    </div>
  );
}

const Questions = QuestionsBase;

export default Questions;
