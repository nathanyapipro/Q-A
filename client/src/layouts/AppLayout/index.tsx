import * as React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { makeStyles } from "@material-ui/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import logo from "../../assets/logo.svg";
interface AppLayoutProps {
  children: React.ReactChild;
}

type Props = AppLayoutProps;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  main: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
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
  }
}));

function AppLayoutBase(props: Props) {
  const { children } = props;
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <div className={classes.content}>
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
          <main className={classes.main}>{children}</main>
        </ErrorBoundary>
      </div>
    </div>
  );
}

const AppLayout = AppLayoutBase;

export default AppLayout;
