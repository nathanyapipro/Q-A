import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/styles";
import { Query, Mutation } from "react-apollo";
import * as lsGlobalQueries from "../../states/global/queries";
import {
  Menu,
  MenuVariables,
  MenuToggle,
  MenuToggleVariables
} from "../../states/global/types";

class LSGlobalMenuQuery extends Query<Menu, MenuVariables> {}
class LSGlobalMenuToggleMutation extends Mutation<
  MenuToggle,
  MenuToggleVariables
> {}

export const SIDEBAR_WIDTH = 260;

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
  const { children } = props;

  const classes = useStyles({});

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <LSGlobalMenuQuery query={lsGlobalQueries.menu}>
          {({ data }) => {
            if (!data || !data.global) {
              return <noscript />;
            }

            return (
              <LSGlobalMenuToggleMutation mutation={lsGlobalQueries.toggleMenu}>
                {toggleMenu => (
                  <Drawer
                    variant="temporary"
                    open={data.global.menu}
                    onClose={_ => toggleMenu()}
                    classes={{
                      paper: classes.drawerPaper
                    }}
                    ModalProps={{
                      keepMounted: true
                    }}
                  >
                    <div className={classes.content}>{children}</div>
                  </Drawer>
                )}
              </LSGlobalMenuToggleMutation>
            );
          }}
        </LSGlobalMenuQuery>
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
