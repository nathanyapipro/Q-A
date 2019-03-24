import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import CloseIcon from "@material-ui/icons/Close";
import Button from "@material-ui/core/Button";
import StatusAutocomplete from "../../components/Autocomplete/Status";
import TagAutocomplete from "../../components/Autocomplete/Tag";
import OrderByAutocomplete from "../../components/Autocomplete/OrderBy";
import { Theme } from "@material-ui/core/styles";
import { QuestionsOrderBy } from "../../types/apollo";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { compose } from "react-apollo";
import { questionsActions } from "../../states/questions";

type ReduxStateProps = {
  workspaceId: number;
  tagIds: Array<number>;
  statusIds: Array<number>;
  orderBy: Array<QuestionsOrderBy>;
};

interface ReduxDispatchProps {
  setFiltersStatusIds: (statusIds: Array<number>) => void;
  setFiltersTagIds: (statusIds: Array<number>) => void;
  setFiltersOrderBy: (statusIds: Array<QuestionsOrderBy>) => void;
  resetFilters: () => void;
}
interface OwnProps {
  toggleFilters?: (e: React.SyntheticEvent<{}, Event>) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    borderBottom: `1px solid ${theme.palette.divider}`,
    alignItems: "center",
    minHeight: theme.spacing.unit * 6
  },
  headerTitle: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1,
    alignItems: "center"
  },
  headerIcon: {
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  closeButton: {
    alignSelf: "flex-end",
    width: theme.spacing.unit * 8,
    height: theme.spacing.unit * 6,
    minWidth: "unset"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    height: "min-content",
    padding: theme.spacing.unit * 2
  },
  field: {
    display: "flex",
    marginTop: theme.spacing.unit * 2,
    "&:first-child": {
      marginTop: 0
    }
  },
  resetButton: {
    marginTop: theme.spacing.unit * 1.5
  }
}));

function FiltersBase(props: Props) {
  const classes = useStyles();
  const {
    statusIds,
    tagIds,
    orderBy,
    workspaceId,
    toggleFilters,
    setFiltersStatusIds,
    setFiltersTagIds,
    setFiltersOrderBy,
    resetFilters
  } = props;

  function handleSetStatusIds(item: number | Array<number>) {
    const value = item ? (item instanceof Array ? item : [item]) : [];
    setFiltersStatusIds(value);
  }

  function handleSetTagIds(item: number | Array<number>) {
    const value = item instanceof Array ? item : [item];
    setFiltersTagIds(value);
  }

  function handleSetOrderBy(item: QuestionsOrderBy | Array<QuestionsOrderBy>) {
    const value = item instanceof Array ? item : [item];
    setFiltersOrderBy(value);
  }

  function handleResetFilters(_: React.MouseEvent<HTMLElement, MouseEvent>) {
    resetFilters();
  }

  return (
    <div className={classes.container}>
      {toggleFilters && (
        <div className={classes.header}>
          <Button
            color="primary"
            className={classes.closeButton}
            onClick={toggleFilters}
          >
            <CloseIcon color="inherit" />
          </Button>
        </div>
      )}
      <div className={classes.content}>
        <div className={classes.field}>
          <StatusAutocomplete
            value={statusIds}
            label="Status Filter"
            isClearable
            onChange={handleSetStatusIds}
          />
        </div>
        <div className={classes.field}>
          <TagAutocomplete
            workspaceId={workspaceId}
            value={tagIds}
            label="Tags Filter"
            onChange={handleSetTagIds}
          />
        </div>
        <div className={classes.field}>
          <OrderByAutocomplete
            value={orderBy}
            label="Order By"
            onChange={handleSetOrderBy}
          />
        </div>
        <Button
          color="primary"
          variant="contained"
          className={classes.resetButton}
          onClick={handleResetFilters}
        >
          Reset
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    workspaceId: state.global.workspaceId,
    ...state.questions.filters
  };
};

const Filters: React.ComponentType<OwnProps> = compose(
  connect(
    mapStateToProps,
    {
      setFiltersStatusIds: questionsActions.setFiltersStatusIds,
      setFiltersTagIds: questionsActions.setFiltersTagIds,
      setFiltersOrderBy: questionsActions.setFiltersOrderBy,
      resetFilters: questionsActions.resetFilters
    }
  )
)(FiltersBase);

export default Filters;
