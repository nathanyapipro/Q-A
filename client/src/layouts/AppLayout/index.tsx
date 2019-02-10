import * as React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { makeStyles } from "@material-ui/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Divider from "@material-ui/core/Divider";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { SIDEBAR_WIDTH } from "./Sidebar";
import Typography from "@material-ui/core/Typography";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ListIcon from "@material-ui/icons/List";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import SettingsIcon from "@material-ui/icons/Settings";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { compose } from "react-apollo";
import {
  withUpdateAuthMutation,
  WithUpdateAuthMutation
} from "../../queries/local/withUpdateAuthMutation";
import { Theme } from "@material-ui/core/styles";
interface OwnProps {
  children: React.ReactChild;
}

type Props = OwnProps & WithUpdateAuthMutation;

const useStyles = makeStyles((theme: Theme) => ({
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
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit * 3}px`
  },
  navLink: {
    cursor: "pointer",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexShrink: 0,
    padding: theme.spacing.unit * 1.5,
    backgroundColor: "transparent",
    transition: theme.transitions.create(["background"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  linkIcon: {
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2
  },
  linkActive: {
    backgroundColor: theme.palette.action.selected
  }
}));

function AppLayoutBase(props: Props) {
  const { children, updateAuth } = props;
  const classes = useStyles();

  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  function handleNavClick(_: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (isMenuOpen) {
      toggleMenu();
    }
  }

  function handleLogOut(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    handleNavClick(e);
    updateAuth({
      variables: {
        jwtToken: null,
        userId: null
      }
    });
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
            <NavLink
              onClick={handleNavClick}
              exact
              to="/ask-a-question"
              className={classes.navLink}
              activeClassName={classes.linkActive}
            >
              <ContactSupportIcon
                className={classes.linkIcon}
                color="inherit"
              />
              <Typography color="inherit" variant="body1">
                Ask a Question
              </Typography>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              exact
              to="/"
              className={classes.navLink}
              activeClassName={classes.linkActive}
            >
              <ListIcon className={classes.linkIcon} color="inherit" />
              <Typography color="inherit" variant="body1">
                Questions
              </Typography>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              exact
              to="/profile"
              className={classes.navLink}
              activeClassName={classes.linkActive}
            >
              <AccountCircleIcon className={classes.linkIcon} color="inherit" />
              <Typography color="inherit" variant="body1">
                Profile
              </Typography>
            </NavLink>
            <NavLink
              onClick={handleNavClick}
              exact
              to="/settings"
              className={classes.navLink}
              activeClassName={classes.linkActive}
            >
              <SettingsIcon className={classes.linkIcon} color="inherit" />
              <Typography color="inherit" variant="body1">
                Settings
              </Typography>
            </NavLink>
            <div className={classes.navLink} onClick={handleLogOut}>
              <ArrowBackIcon className={classes.linkIcon} color="inherit" />
              <Typography color="inherit" variant="body1">
                Log Out
              </Typography>
            </div>
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

const AppLayout: React.ComponentType<OwnProps> = compose(
  withUpdateAuthMutation
)(AppLayoutBase);

export default AppLayout;
