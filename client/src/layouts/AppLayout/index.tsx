import * as React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { makeStyles } from "@material-ui/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
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
          <Sidebar>Items</Sidebar>
          <main className={classes.main}>{children}</main>
        </ErrorBoundary>
      </div>
    </div>
  );
}

const AppLayout = AppLayoutBase;

export default AppLayout;
