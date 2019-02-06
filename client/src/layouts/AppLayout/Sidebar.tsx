import * as React from "react";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import { makeStyles } from "@material-ui/styles";
import { compose, Mutation } from "react-apollo";
import * as lsGlobalQueries from "../../states/global/queries";
import { MenuToggle, MenuToggleVariables } from "../../states/global/types";
import {
  withLSGlobalMenuQuery,
  WithLSGlobalMenuQuery
} from "../../hocs/withLSGlobalMenuQuery";

class LSGlobalMenuToggleMutation extends Mutation<
  MenuToggle,
  MenuToggleVariables
> {}

export const SIDEBAR_WIDTH = 260;

interface OwnProps {
  children: React.ReactChild;
}

type Props = OwnProps & WithLSGlobalMenuQuery;

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
  const { children, menu } = props;

  const classes = useStyles({});

  return (
    <nav className={classes.drawer}>
      {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
      <Hidden smUp implementation="css">
        <LSGlobalMenuToggleMutation mutation={lsGlobalQueries.toggleMenu}>
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
              <div className={classes.content}>{children}</div>
            </Drawer>
          )}
        </LSGlobalMenuToggleMutation>
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

const Sidebar: React.ComponentType<OwnProps> = compose(withLSGlobalMenuQuery)(
  SidebarBase
);

export default Sidebar;
