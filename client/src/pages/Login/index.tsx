import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { compose } from "react-apollo";
import GoogleLogin from "react-google-login";
import Button from "@material-ui/core/Button";
import {
  withLoginAnonymousMutation,
  WithLoginAnonymousMutation
} from "../../queries/withLoginAnonymousMutation";
import {
  withUpdateAuthMutation,
  WithUpdateAuthMutation
} from "../../queries/local/withUpdateAuthMutation";
import { Theme } from "@material-ui/core/styles";

interface OwnProps {}

type Props = OwnProps & WithUpdateAuthMutation & WithLoginAnonymousMutation;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    width: theme.spacing.unit * 30
  }
}));

function LoginBase({ loginAnonymous, updateAuth }: Props) {
  const classes = useStyles();

  async function handleSuccess({ googleId, profileObj }: any) {
    if (profileObj && profileObj.email) {
      const isValid = profileObj.email.match(/@elementai.com/g).length === 1;

      if (isValid && googleId) {
        const response = await loginAnonymous({
          variables: {
            loginAnonymousInput: {
              username: googleId
            }
          }
        });

        if (response && response.data && response.data.loginAnonymous) {
          const { jwtToken } = response.data.loginAnonymous;
          updateAuth({
            variables: {
              jwtToken,
              userId: 1
            }
          });
        }
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
  withLoginAnonymousMutation
)(LoginBase);

export default Login;
