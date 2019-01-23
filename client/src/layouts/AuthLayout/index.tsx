import * as React from "react";
import { makeStyles } from "@material-ui/styles";

interface AuthLayoutProps {
  children: React.ReactChild;
}

type Props = AuthLayoutProps;

const useStyles = makeStyles(_ => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flex: "1 0 auto"
  }
}));

function AuthLayoutBase(props: Props) {
  const { children } = props;
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      Auth
      {children}
    </div>
  );
}

const AuthLayout = AuthLayoutBase;

export default AuthLayout;
