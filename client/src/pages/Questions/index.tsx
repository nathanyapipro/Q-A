import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import Filters from "./Filters";
import QuestionsTable from "../../components/QuestionsTable";
import Button from "@material-ui/core/Button";
import FilterListIcon from "@material-ui/icons/FilterList";
import Typography from "@material-ui/core/Typography";
import { QuestionsVariables } from "../../types/apollo/Questions";
import Paper from "@material-ui/core/Paper";
import { Theme } from "@material-ui/core/styles";
import { QuestionsOrderBy } from "../../types/apollo";
import { compose } from "react-apollo";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { questionsActions } from "../../states/questions";

interface OwnProps {}

type ReduxStateProps = {
  workspaceId: number;
  tagIds: Array<number>;
  statusIds: Array<number>;
  orderBy: Array<QuestionsOrderBy>;
  offset: number;
  first: number;
  isFiltersOpen: boolean;
};

interface ReduxDispatchProps {
  toggleFiltersOpen: () => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  content: {
    display: "flex",
    flexDirection: "row",
    position: "relative"
  },
  fullWidth: {
    width: "100%"
  },
  filters: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    height: "min-content",
    width: theme.spacing.unit * 40,
    marginLeft: theme.spacing.unit * 2
  },
  drawerPaper: {
    height: "100%"
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

function QuestionsBase(props: Props) {
  const classes = useStyles();
  const {
    workspaceId,
    tagIds,
    statusIds,
    orderBy,
    offset,
    first,
    isFiltersOpen,
    toggleFiltersOpen
  } = props;

  function toggleFilters(_: React.SyntheticEvent<{}, Event>) {
    toggleFiltersOpen();
  }

  const queryParams: QuestionsVariables = {
    first: first,
    offset: offset,
    filter: {
      tagIds: {
        contains: tagIds.length > 0 ? tagIds : null
      },
      statusId: {
        in: statusIds.length > 0 ? statusIds : null
      }
    },
    workspaceId,
    orderBy: orderBy
  };

  return (
    <div className={classes.container}>
      <Hidden mdUp>
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
      </Hidden>
      <div className={classes.content}>
        <QuestionsTable {...queryParams} />
        <Hidden mdUp>
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
            <Filters toggleFilters={toggleFilters} />
          </Drawer>
        </Hidden>
        <Hidden className={classes.fullWidth} smDown>
          <Paper elevation={1} className={classes.filters}>
            <Filters />
          </Paper>
        </Hidden>
      </div>
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    workspaceId: state.global.workspaceId,
    ...state.questions.filters,
    ...state.questions.pagination,
    isFiltersOpen: state.questions.isFiltersOpen
  };
};

const Questions: React.ComponentType<OwnProps> = compose(
  connect(
    mapStateToProps,
    {
      toggleFiltersOpen: questionsActions.toggleFiltersOpen
    }
  )
)(QuestionsBase);

export default Questions;
