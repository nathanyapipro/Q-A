import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { compose } from "react-apollo";
import Button from "@material-ui/core/Button";
import * as withLoginMutation from "../../queries/withLoginMutation";
import { Theme } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { globalActions } from "../../states/global";
import { SetAuthPayload } from "../../states/global/actions";
import TextField from "@material-ui/core/TextField";
import { FormFieldMeta } from "../../types";

interface OwnProps {}

type ReduxStateProps = {};

interface ReduxDispatchProps {
  setAuth: (params: SetAuthPayload) => void;
}

type Props = OwnProps &
  withLoginMutation.ChildProps &
  ReduxStateProps &
  ReduxDispatchProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  field: {
    width: theme.spacing.unit * 35,
    marginBottom: theme.spacing.unit * 1
  },
  button: {
    marginTop: theme.spacing.unit * 1,
    marginBottom: theme.spacing.unit * 2,
    width: "100%"
  }
}));

function LoginAdminBase({ login, setAuth }: Props) {
  const classes = useStyles();

  const [username, setUsername] = React.useState<FormFieldMeta<string>>({
    value: "",
    touched: false,
    error: false
  });

  const [password, setPassword] = React.useState<FormFieldMeta<string>>({
    value: "",
    touched: false,
    error: false
  });

  function handleUsernameChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setUsername({
      value,
      touched: true,
      error: !(value && value !== "")
    });
  }

  function handlePasswordChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setPassword({
      value,
      touched: true,
      error: !(value && value !== "")
    });
  }

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault();
    if (!username.error || !password.error) {
      const response = await login({
        variables: {
          loginInput: {
            username: username.value,
            password: password.value
          }
        }
      });
      if (
        response &&
        response.data &&
        response.data.login &&
        response.data.login.auth &&
        response.data.login.auth.jwtToken &&
        response.data.login.auth.currentUser
      ) {
        const {
          auth: {
            jwtToken,
            currentUser: { id, username, role }
          }
        } = response.data.login;

        const currentUser = {
          id,
          username,
          role
        };

        setAuth({
          auth: {
            jwtToken,
            currentUser,
            email: ""
          }
        });
      }
    }
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <TextField
        className={classes.field}
        variant="outlined"
        fullWidth
        label="Username"
        InputLabelProps={{
          shrink: true
        }}
        error={username.error}
        margin="dense"
        value={username.value}
        onChange={handleUsernameChange}
      />
      <TextField
        className={classes.field}
        variant="outlined"
        fullWidth
        type="password"
        label="Password"
        InputLabelProps={{
          shrink: true
        }}
        error={password.error}
        margin="dense"
        value={password.value}
        onChange={handlePasswordChange}
      />
      <Button
        color="primary"
        type="submit"
        variant="contained"
        className={classes.button}
      >
        Login
      </Button>
    </form>
  );
}

const mapStateToProps = (_: StoreState): ReduxStateProps => {
  return {};
};

const LoginAdmin: React.ComponentType<
  OwnProps & withLoginMutation.InputProps
> = compose(
  withLoginMutation.hoc,
  connect(
    mapStateToProps,
    {
      setAuth: globalActions.setAuth
    }
  )
)(LoginAdminBase);

export default LoginAdmin;
