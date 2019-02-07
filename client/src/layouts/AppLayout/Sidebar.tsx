import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/styles";

export const SIDEBAR_WIDTH = 260;

interface OwnProps {
  isMenuOpen: boolean;
  toggleMenu: () => void;
  children: React.ReactChild;
}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: SIDEBAR_WIDTH,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH,
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText
  },
  content: {
    display: "flex",
    flexDirection: "column"
  }
}));

function SidebarBase(props: Props) {
  const { children, isMenuOpen, toggleMenu } = props;

  const classes = useStyles({});

  function handleClose(_: React.SyntheticEvent<{}, Event>) {
    toggleMenu();
  }

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Drawer
          variant="temporary"
          open={isMenuOpen}
          onClose={handleClose}
          classes={{
            paper: classes.drawerPaper
          }}
          ModalProps={{
            keepMounted: true
          }}
        >
          {children}
        </Drawer>
      </Hidden>
      <Hidden xsDown implementation="css">
        <Drawer
          classes={{
            paper: classes.drawerPaper
          }}
          variant="permanent"
          open
        >
          {children}
        </Drawer>
      </Hidden>
    </nav>
  );
}

const Sidebar = SidebarBase;

export default Sidebar;
