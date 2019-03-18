import * as React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { makeStyles } from "@material-ui/styles";
import Header from "./Header";
import Sidebar from "./Sidebar";
import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { SIDEBAR_WIDTH } from "./Sidebar";
import Typography from "@material-ui/core/Typography";
import ContactSupportIcon from "@material-ui/icons/ContactSupport";
import ListIcon from "@material-ui/icons/List";
// import AccountCircleIcon from "@material-ui/icons/AccountCircle";
// import SettingsIcon from "@material-ui/icons/Settings";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import { compose } from "react-apollo";
import { Theme } from "@material-ui/core/styles";
import WorkspaceAutocomplete from "../../components/Autocomplete/Workspace";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { globalActions } from "../../states/global";
import { SetAuthPayload } from "../../states/global/actions";
import moment from "moment";
import Tooltip from "@material-ui/core/Tooltip";

interface OwnProps {
  children: React.ReactChild;
}

type ReduxStateProps = {
  workspaceId: number;
  isSiteMapOpen: boolean;
};

interface ReduxDispatchProps {
  setAuth: (params: SetAuthPayload) => void;
  toggleSiteMapOpen: () => void;
  setWorkspaceId: (id: number) => void;
}

type Props = OwnProps & ReduxStateProps & ReduxDispatchProps;

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
  workspaceSelect: {
    padding: `${theme.spacing.unit * 1}px ${theme.spacing.unit * 2}px`,
    color: theme.palette.primary.contrastText,
    "& input, p, svg, label": {
      color: `${theme.palette.primary.contrastText} !important`
    },
    "& fieldset": {
      borderColor: `${theme.palette.primary.contrastText} !important`
    }
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
    flexGrow: 1,
    padding: `${theme.spacing.unit * 2}px ${theme.spacing.unit}px`,
    [theme.breakpoints.up("sm")]: {
      padding: theme.spacing.unit * 3
    }
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
  },
  spacer: {
    flexGrow: 1
  },
  footer: {
    display: "flex",
    flexDirection: "column",
    flexShrink: 0,
    alignItems: "center",
    padding: theme.spacing.unit,
    borderTop: `1px solid ${theme.palette.divider}`
  },
  externalLink: {
    textDecoration: "underline"
  }
}));

function AppLayoutBase(props: Props) {
  const {
    children,
    setAuth,
    setWorkspaceId,
    workspaceId,
    toggleSiteMapOpen,
    isSiteMapOpen
  } = props;
  const classes = useStyles();

  function handleNavClick(_: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (isSiteMapOpen) {
      toggleSiteMapOpen();
    }
  }

  function handleLogOut(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    handleNavClick(e);
    setAuth({});
  }

  function handleSetWorkspace(item: number | Array<number>) {
    const value = item ? (item instanceof Array ? item[0] : item) : 1;
    setWorkspaceId(value);
  }

  return (
    <div className={classes.container}>
      <ErrorBoundary>
        <Header toggleSiteMapOpen={toggleSiteMapOpen} />
        <Sidebar
          isSiteMapOpen={isSiteMapOpen}
          toggleSiteMapOpen={toggleSiteMapOpen}
        >
          <React.Fragment>
            <div className={classes.header}>
              <img className={classes.logo} src={logo} alt="Logo" />
            </div>
            <div className={classes.workspaceSelect}>
              <WorkspaceAutocomplete
                value={[workspaceId]}
                label="Workspace"
                onChange={handleSetWorkspace}
              />
            </div>
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
              to="/questions"
              className={classes.navLink}
              activeClassName={classes.linkActive}
            >
              <ListIcon className={classes.linkIcon} color="inherit" />
              <Typography color="inherit" variant="body1">
                Questions
              </Typography>
            </NavLink>
            {/* <NavLink
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
            </NavLink> */}
            <div className={classes.spacer} />
            <div className={classes.navLink} onClick={handleLogOut}>
              <ArrowBackIcon className={classes.linkIcon} color="inherit" />
              <Typography color="inherit" variant="body1">
                Log Out
              </Typography>
            </div>
            <Tooltip
              title="Created By Nathan Yapi & Matt Leus"
              placement="right"
            >
              <div className={classes.footer}>
                <a
                  href="https://elementai.slack.com/messages/CAY6N2BJA/convo/CAY6N2BJA-1533151972.000154%23/#"
                  target="_blank"
                  className={classes.externalLink}
                >
                  <Typography color="inherit" variant="body1">
                    Leave feedback
                  </Typography>
                </a>
                <a
                  href="https://github.com/ElementAI/fundamental"
                  target="_blank"
                  className={classes.externalLink}
                >
                  <Typography color="inherit" variant="body1">
                    Look at the codebase
                  </Typography>
                </a>
                <Typography color="inherit" variant="body1">
                  {`© Element AI ${moment().year()}`}
                </Typography>
              </div>
            </Tooltip>
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

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    workspaceId: state.global.workspaceId,
    isSiteMapOpen: state.global.isSiteMapOpen
  };
};

const AppLayout: React.ComponentType<OwnProps> = compose(
  connect(
    mapStateToProps,
    {
      setAuth: globalActions.setAuth,
      toggleSiteMapOpen: globalActions.toggleSiteMapOpen,
      setWorkspaceId: globalActions.setWorkspaceId
    }
  )
)(AppLayoutBase);

export default AppLayout;
