import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import { SIDEBAR_WIDTH } from "./Sidebar";
import Typography from "@material-ui/core/Typography";
import { Switch, Route, Link } from "react-router-dom";
import { Theme } from "@material-ui/core/styles";
import { QuestionRouteProps } from "../../pages/Question";

interface OwnProps {
  toggleSiteMapOpen: () => void;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    marginLeft: SIDEBAR_WIDTH,
    [theme.breakpoints.up("md")]: {
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`
    }
  },
  menuButton: {
    [theme.breakpoints.up("md")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar,
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  },
  backButton: {
    marginRight: theme.spacing.unit
  }
}));

function HeaderBase(props: Props) {
  const classes = useStyles();
  const { toggleSiteMapOpen } = props;

  function handleClick(_: React.MouseEvent<HTMLElement, MouseEvent>) {
    toggleSiteMapOpen();
  }

  return (
    <AppBar position="fixed" color="default" className={classes.appBar}>
      <Toolbar>
        <div className={classes.container}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleClick}
            className={classes.menuButton}
          >
            <MenuIcon />
          </IconButton>
          <Switch>
            <Route
              path="/ask-a-question"
              component={() => (
                <Typography variant="h6" color="inherit">
                  Ask a Question
                </Typography>
              )}
            />
            <Route
              path="/questions"
              exact
              component={() => (
                <Typography variant="h6" color="inherit">
                  Questions
                </Typography>
              )}
            />
            <Route
              path="/questions/:id"
              component={({
                match: {
                  params: { id }
                }
              }: QuestionRouteProps) => (
                <React.Fragment>
                  <Link to="/questions">
                    <IconButton className={classes.backButton} color="inherit">
                      <ChevronLeftIcon color="inherit" />
                    </IconButton>
                  </Link>
                  <Typography variant="h6" color="inherit">
                    {`Questions ${id}`}
                  </Typography>
                </React.Fragment>
              )}
            />
            <Route
              path="/profile"
              component={() => (
                <Typography variant="h6" color="inherit">
                  Profile
                </Typography>
              )}
            />
            <Route
              path="/settings"
              component={() => (
                <Typography variant="h6" color="inherit">
                  Settings
                </Typography>
              )}
            />
          </Switch>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const Header = HeaderBase;

export default Header;
