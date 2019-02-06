import * as React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { makeStyles } from "@material-ui/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Divider from "@material-ui/core/Divider";
import List from "@material-ui/core/List";
import logo from "../../assets/logo.svg";
import { SIDEBAR_WIDTH } from "./Sidebar";

interface OwnProps {
  children: React.ReactChild;
}

type Props = OwnProps;

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
    flexShrink: 0,
    width: "100vw",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100vw - ${SIDEBAR_WIDTH}px)`
    }
  },
  children: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    padding: theme.spacing.unit * 3
  }
}));

function AppLayoutBase(props: Props) {
  const { children } = props;
  const classes = useStyles({});

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className={classes.container}>
      <ErrorBoundary>
        <Header toggleMenu={toggleMenu} />
        <Sidebar isMenuOpen={isMenuOpen} toggleMenu={toggleMenu}>
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
          <div className={classes.children}>{children}</div>
        </main>
      </ErrorBoundary>
    </div>
  );
}

const AppLayout = AppLayoutBase;

export default AppLayout;
