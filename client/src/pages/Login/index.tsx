import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { compose } from "react-apollo";
import GoogleLogin from "react-google-login";
import Button from "@material-ui/core/Button";
import {
  withLoginMutation,
  WithLoginMutation
} from "../../queries/withLoginMutation";
import {
  withUpdateAuthMutation,
  WithUpdateAuthMutation
} from "../../queries/local/withUpdateAuthMutation";

interface OwnProps {}

type Props = OwnProps & WithUpdateAuthMutation & WithLoginMutation;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    width: theme.spacing.unit * 30
  }
}));

function LoginBase({ login }: Props) {
  const classes = useStyles({});

  function handleSuccess({ googleId, profileObj }: any) {
    if (profileObj && profileObj.email) {
      const isValid = profileObj.email.match(/@elementai.com/g).length === 1;

      if (isValid && googleId) {
        login({
          variables: {
            loginInput: {
              username: googleId
            }
          }
        });
      }
    }
  }

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
        onSuccess={handleSuccess}
        onFailure={console.log}
      />
    </div>
  );
}

const Login: React.ComponentType<OwnProps> = compose(
  withUpdateAuthMutation,
  withLoginMutation
)(LoginBase);

export default Login;
