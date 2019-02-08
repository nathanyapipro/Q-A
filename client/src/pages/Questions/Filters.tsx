import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import StatusFilter from "../../components/QuestionsFilters/Status";
import TagsFilter from "../../components/QuestionsFilters/Tags";

interface OwnProps {}

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

function FiltersBase(_: Props) {
  const classes = useStyles({});

  return (
    <React.Fragment>
      <div className={classes.field}>
        <StatusFilter />
      </div>
      <div className={classes.field}>
        <TagsFilter />
      </div>
    </React.Fragment>
  );
}

const Filters = FiltersBase;

export default Filters;
