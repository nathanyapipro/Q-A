import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/styles";
import { Query, Mutation } from "react-apollo";
import {
  GLOBAL_MENU_GET,
  GLOBAL_MENU_TOGGLE
} from "../../states/global/queries";

export const SIDEBAR_WIDTH = 300;

interface SidebarProps {
  children: React.ReactChild;
}

type Props = SidebarProps;

const useStyles = makeStyles(theme => ({
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: SIDEBAR_WIDTH,
      flexShrink: 0
    }
  },
  drawerPaper: {
    width: SIDEBAR_WIDTH
  }
}));

function SidebarBase(props: Props) {
  const { children } = props;

  const classes = useStyles({});

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <Query query={GLOBAL_MENU_GET}>
          {({
            data: {
              global: { menu }
            }
          }) => (
            <Mutation mutation={GLOBAL_MENU_TOGGLE}>
              {toggleMenu => (
                <Drawer
                  variant="temporary"
                  open={menu}
                  onClose={_ => toggleMenu()}
                  classes={{
                    paper: classes.drawerPaper
                  }}
                  ModalProps={{
                    keepMounted: true
                  }}
                >
                  {children}
                </Drawer>
              )}
            </Mutation>
          )}
        </Query>
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
