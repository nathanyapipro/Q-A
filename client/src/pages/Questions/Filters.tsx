import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { QueryType } from ".";
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

type ReduxStateProps = {
  workspaceId: number;
};
interface OwnProps {
  toggleFilters?: (e: React.SyntheticEvent<{}, Event>) => void;
  query: QueryType;
  setQuery: React.Dispatch<React.SetStateAction<QueryType>>;
}

type Props = OwnProps & ReduxStateProps;

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
  }
}));

function FiltersBase(props: Props) {
  const classes = useStyles();
  const { query, setQuery, workspaceId, toggleFilters } = props;

  function handleSetStatusIds(item: number | Array<number>) {
    const value = item ? (item instanceof Array ? item : [item]) : [];
    setQuery({
      ...query,
      offset: 0,
      statusIds: value
    });
  }

  function handleSetTagIds(item: number | Array<number>) {
    const value = item instanceof Array ? item : [item];
    setQuery({
      ...query,
      offset: 0,
      tagIds: value
    });
  }

  function handleSetOrderBy(item: QuestionsOrderBy | Array<QuestionsOrderBy>) {
    const value = item instanceof Array ? item : [item];
    setQuery({
      ...query,
      offset: 0,
      orderBy: value
    });
  }
  return (
    <div className={classes.container}>
      {toggleFilters && (
        <div className={classes.header}>
          <Button
            color="primary"
            disableRipple
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
            value={query.statusIds}
            label="Status Filter"
            isClearable
            onChange={handleSetStatusIds}
          />
        </div>
        <div className={classes.field}>
          <TagAutocomplete
            workspaceId={workspaceId}
            value={query.tagIds}
            label="Tag Filter"
            onChange={handleSetTagIds}
          />
        </div>
        <div className={classes.field}>
          <OrderByAutocomplete
            value={query.orderBy}
            label="Order By"
            onChange={handleSetOrderBy}
          />
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    workspaceId: state.global.workspaceId
  };
};

const Filters: React.ComponentType<OwnProps> = compose(
  connect(
    mapStateToProps,
    {}
  )
)(FiltersBase);

export default Filters;
