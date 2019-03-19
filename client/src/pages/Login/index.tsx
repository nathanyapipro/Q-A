import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { compose } from "react-apollo";
import GoogleLogin from "react-google-login";
import Button from "@material-ui/core/Button";
import * as withLoginAnonymousMutation from "../../queries/withLoginAnonymousMutation";
import { Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { globalActions } from "../../states/global";
import { SetAuthPayload } from "../../states/global/actions";

interface OwnProps {}

type ReduxStateProps = {};

interface ReduxDispatchProps {
  setAuth: (params: SetAuthPayload) => void;
}

type Props = OwnProps &
  withLoginAnonymousMutation.ChildProps &
  ReduxStateProps &
  ReduxDispatchProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  button: {
    width: theme.spacing.unit * 30
  }
}));

function LoginBase({ loginAnonymous, setAuth }: Props) {
  const classes = useStyles();

  async function handleSuccess({ googleId, profileObj }: any) {
    if (profileObj && profileObj.email) {
      const { email } = profileObj;
      const isValid = email.match(/@elementai.com/g).length === 1;

      if (isValid && googleId) {
        const response = await loginAnonymous({
          variables: {
            loginAnonymousInput: {
              username: googleId
            }
          }
        });

        if (
          response &&
          response.data &&
          response.data.loginAnonymous &&
          response.data.loginAnonymous.auth &&
          response.data.loginAnonymous.auth.jwtToken &&
          response.data.loginAnonymous.auth.currentUser
        ) {
          const {
            auth: {
              jwtToken,
              currentUser: { id, username, role }
            }
          } = response.data.loginAnonymous;

          const currentUser = {
            id,
            username,
            role
          };

          setAuth({
            auth: {
              jwtToken,
              currentUser,
              email
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

const mapStateToProps = (_: StoreState): ReduxStateProps => {
  return {};
};

const Login: React.ComponentType<
  OwnProps & withLoginAnonymousMutation.InputProps
> = compose(
  withLoginAnonymousMutation.hoc,
  connect(
    mapStateToProps,
    {
      setAuth: globalActions.setAuth
    }
  )
)(LoginBase);

export default Login;
