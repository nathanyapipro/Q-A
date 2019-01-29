import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import { SIDEBAR_WIDTH } from "./Sidebar";
import { Mutation } from "react-apollo";
import * as lsGlobalQueries from "../../states/global/queries";
import { MenuToggle, MenuToggleVariables } from "../../states/global/types";

class LSGlobalMenuToggleMutation extends Mutation<
  MenuToggle,
  MenuToggleVariables
> {}

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
        <LSGlobalMenuToggleMutation mutation={lsGlobalQueries.toggleMenu}>
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
        </LSGlobalMenuToggleMutation>
      </Toolbar>
    </AppBar>
  );
}

const Header = HeaderBase;

export default Header;
