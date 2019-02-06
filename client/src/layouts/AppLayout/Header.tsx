import * as React from "react";
import AppBar from "@material-ui/core/AppBar";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import { makeStyles } from "@material-ui/styles";
import { SIDEBAR_WIDTH } from "./Sidebar";
import Typography from "@material-ui/core/Typography";

interface OwnProps {
  toggleMenu: () => void;
}

type Props = OwnProps;

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
  toolbar: theme.mixins.toolbar,
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center"
  }
}));

function HeaderBase(props: Props) {
  const classes = useStyles({});
  const { toggleMenu } = props;

  function handleClick(_: React.MouseEvent<HTMLElement, MouseEvent>) {
    toggleMenu();
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
          <Typography variant="h6" color="inherit">
            Page Title
          </Typography>
        </div>
      </Toolbar>
    </AppBar>
  );
}

const Header = HeaderBase;

export default Header;
