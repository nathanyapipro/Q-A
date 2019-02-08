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
    marginBottom: theme.spacing.unit
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
    flexGrow: 1,
    marginBottom: theme.spacing.unit
  },
  filterButtonIcon: {
    marginRight: theme.spacing.unit * 2
  }
}));

function QuestionsBase(_: Props) {
  const classes = useStyles({});

  const [isFiltersOpen, setIsFiltersOpen] = React.useState<boolean>(false);

  function toggleFilters(_: React.SyntheticEvent<{}, Event>) {
    setIsFiltersOpen(!isFiltersOpen);
  }

  return (
    <div className={classes.container}>
      <Hidden smUp implementation="css">
        <div className={classes.header}>
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
              <Filters />
            </div>
          </Drawer>
        </div>
      </Hidden>
      <Hidden className={classes.fullWidth} xsDown implementation="css">
        <div className={classes.header}>
          <Filters />
        </div>
      </Hidden>
      <QuestionsTable />
    </div>
  );
}

const Questions = QuestionsBase;

export default Questions;
