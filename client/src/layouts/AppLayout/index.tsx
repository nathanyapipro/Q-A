import * as React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { makeStyles } from "@material-ui/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import logo from "../../assets/logo.svg";
import { SIDEBAR_WIDTH } from "./Sidebar";

interface AppLayoutProps {
  children: React.ReactChild;
}

type Props = AppLayoutProps;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flex: "1 0 auto"
  },
  header: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: `0px ${theme.spacing.unit * 3}px`,
    ...theme.mixins.toolbar
  },
  logo: {
    height: theme.spacing.unit * 4
  },
  toolbar: theme.mixins.toolbar,
  main: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    width: "100vw",
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100vw - ${SIDEBAR_WIDTH}px)`
    }
  }
}));

function AppLayoutBase(props: Props) {
  const { children } = props;
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <ErrorBoundary>
        <Header />
        <Sidebar>
          <React.Fragment>
            <div className={classes.header}>
              <img className={classes.logo} src={logo} alt="Logo" />
            </div>
            <Divider />
            <List>Items</List>
          </React.Fragment>
        </Sidebar>
        <main className={classes.main}>
          <div className={classes.toolbar} />
          {children}
        </main>
      </ErrorBoundary>
    </div>
  );
}

const AppLayout = AppLayoutBase;

export default AppLayout;
