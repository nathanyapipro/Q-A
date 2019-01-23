import * as React from "react";
import ErrorBoundary from "../../components/ErrorBoundary";
import { makeStyles } from "@material-ui/styles";
import Button from "@material-ui/core/Button";
import { Query, Mutation } from "react-apollo";
import {
  GLOBAL_MENU_TOGGLE,
  GLOBAL_MENU_GET
} from "../../states/global/queries";
interface AppLayoutProps {
  children: React.ReactChild;
}

type Props = AppLayoutProps;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  },
  main: {
    paddingLeft: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit * 3
  }
}));

function AppLayoutBase(props: Props) {
  const { children } = props;
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <ErrorBoundary>
          <Mutation mutation={GLOBAL_MENU_TOGGLE}>
            {toggleMenu => (
              <Button onClick={_ => toggleMenu()}>
                <Query query={GLOBAL_MENU_GET}>
                  {({
                    data: {
                      global: { menu }
                    }
                  }) => (menu === true ? "OPEN" : "CLOSED")}
                </Query>
              </Button>
            )}
          </Mutation>
          <main className={classes.main}>{children}</main>
        </ErrorBoundary>
      </div>
    </div>
  );
}

const AppLayout = AppLayoutBase;

export default AppLayout;
