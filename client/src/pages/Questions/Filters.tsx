import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import StatusFilter from "../../components/QuestionsFilters/Status";
import TagsFilter from "../../components/QuestionsFilters/Tags";
import { FiltersType } from ".";

interface OwnProps {
  filters: FiltersType;
  setFilters: React.Dispatch<React.SetStateAction<FiltersType>>;
}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
  field: {
    display: "flex",
    marginLeft: 0,
    marginBottom: theme.spacing.unit,
    "&:first-child": {
      marginBottom: 0
    },
    [theme.breakpoints.up("sm")]: {
      flexGrow: 1,
      flexBasis: 1,
      "&:first-child": {
        marginLeft: 0
      },
      marginBottom: 0,
      marginLeft: theme.spacing.unit
    }
  }
}));

function FiltersBase(props: Props) {
  const classes = useStyles({});
  const { filters, setFilters } = props;

  function handleSetStatusIds(item: number | Array<number>) {
    const value = item instanceof Array ? item : [item];
    setFilters({
      ...filters,
      statusIds: value
    });
  }

  function handleSetTagIds(item: number | Array<number>) {
    const value = item instanceof Array ? item : [item];
    setFilters({
      ...filters,
      tagIds: value
    });
  }
  return (
    <React.Fragment>
      <div className={classes.field}>
        <StatusFilter onChange={handleSetStatusIds} value={filters.statusIds} />
      </div>
      <div className={classes.field}>
        <TagsFilter onChange={handleSetTagIds} value={filters.tagIds} />
      </div>
    </React.Fragment>
  );
}

const Filters = FiltersBase;

export default Filters;
