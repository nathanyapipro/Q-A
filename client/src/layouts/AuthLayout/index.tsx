import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import logo from "../../assets/logo-creds.svg";

interface OwnProps {
  children: React.ReactChild;
}

type Props = OwnProps;

const useStyles = makeStyles(theme => ({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flex: "1 0 auto",
    width: "100vw"
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    minWidth: theme.spacing.unit * 35,
    marginBottom: theme.spacing.unit * 3
  },
  logo: {
    display: "flex",
    marginLeft: "calc(12%)",
    marginRight: "calc(12%)"
  },
  description: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.unit * 3
  },
  children: {
    display: "flex",
    flexDirection: "column"
  }
}));

function AuthLayoutBase(props: Props) {
  const { children } = props;
  const classes = useStyles({});

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <img className={classes.logo} src={logo} alt="Logo" />
          <div className={classes.description}>
            <Typography align="center" variant="body1" gutterBottom>
              Welcome to Element AI’s anonymous Q&A app. We can use this as a
              way to ask or upvote questions that you think are important at
              Fusion or other similar events (all hands, end of iteration demos,
              etc.). Let’s use this app to ask relevant, useful, and
              constructive questions. All questions are completely anonymous, we
              do not retain your identity.
            </Typography>
            <Typography align="center">
              Note: Questions posted here should promote open and transparent
              communication for all Elementals. Please be respectful of others
              and constructive when posting questions.
            </Typography>
          </div>
        </div>
        <div className={classes.children}>{children}</div>
      </div>
    </div>
  );
}

const AuthLayout = AuthLayoutBase;

export default AuthLayout;
