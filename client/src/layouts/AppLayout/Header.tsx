import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import { SIDEBAR_WIDTH } from "./Sidebar";
import { Mutation } from "react-apollo";
import { GLOBAL_MENU_TOGGLE } from "../../states/global/queries";

interface HeaderProps {}

type Props = HeaderProps;

const useStyles = makeStyles(theme => ({
  appBar: {
    marginLeft: SIDEBAR_WIDTH,
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${SIDEBAR_WIDTH}px)`
    }
  },
  menuButton: {
    marginRight: 20,
    [theme.breakpoints.up("sm")]: {
      display: "none"
    }
  },
  toolbar: theme.mixins.toolbar
}));

function HeaderBase(_: Props) {
  const classes = useStyles({});

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Mutation mutation={GLOBAL_MENU_TOGGLE}>
          {toggleMenu => (
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={_ => toggleMenu()}
              className={classes.menuButton}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Mutation>
      </Toolbar>
    </AppBar>
  );
}

const Header = HeaderBase;

export default Header;
