import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { QueryType } from ".";
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
  query: QueryType;
  setQuery: React.Dispatch<React.SetStateAction<QueryType>>;
}

type Props = OwnProps & ReduxStateProps;

const useStyles = makeStyles((theme: Theme) => ({
  field: {
    display: "flex",
    marginLeft: 0,
    marginTop: theme.spacing.unit * 2,
    "&:first-child": {
      marginTop: 0
    },
    [theme.breakpoints.up("sm")]: {
      flexGrow: 1,
      flexBasis: 1,
      "&:first-child": {
        marginLeft: 0
      },
      marginTop: 0,
      marginLeft: theme.spacing.unit
    }
  }
}));

function FiltersBase(props: Props) {
  const classes = useStyles();
  const { query, setQuery, workspaceId } = props;

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
    <React.Fragment>
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
    </React.Fragment>
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
