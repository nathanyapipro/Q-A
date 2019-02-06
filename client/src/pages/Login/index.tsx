import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import GoogleLogin from "react-google-login";
import Button from "@material-ui/core/Button";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    width: theme.spacing.unit * 30
  }
}));

function LoginBase(_: Props) {
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID || ""}
        render={renderProps => (
          <Button
            color="primary"
            variant="contained"
            className={classes.button}
            onClick={renderProps ? renderProps.onClick : _ => _}
          >
            Login
          </Button>
        )}
        buttonText="Login"
        onSuccess={console.log}
        onFailure={console.log}
      />
    </div>
  );
}

const Login = LoginBase;

export default Login;
