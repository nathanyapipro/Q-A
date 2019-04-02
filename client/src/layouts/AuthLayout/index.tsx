import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import logo from "../../assets/logo-creds.svg";
import { Theme } from "@material-ui/core/styles";

interface OwnProps {
  children: React.ReactChild;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    [theme.breakpoints.up("sm")]: {
      alignItems: "center"
    },
    flex: "1 0 auto",
    width: "100vw",
    marginTop: theme.spacing.unit * 2
  },
  content: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  },
  header: {
    display: "flex",
    flexDirection: "column",
    width: "60%",
    flexShrink: 0,
    minWidth: theme.spacing.unit * 35,
    marginBottom: theme.spacing.unit * 3
  },
  logo: {
    display: "flex"
  },
  description: {
    display: "flex",
    flexDirection: "column",
    marginTop: theme.spacing.unit * 3
  },
  children: {
    display: "flex",
    flexShrink: 0,
    flexDirection: "column"
  }
}));

function AuthLayoutBase(props: Props) {
  const { children } = props;
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.content}>
        <div className={classes.header}>
          <img className={classes.logo} src={logo} alt="Logo" />
          <div className={classes.description}>
            <Typography
              align="center"
              variant="body1"
              color="textSecondary"
              gutterBottom
            >
              Welcome to Fundamental! This is your internal portal for asking
              questions, making statements and upvoting others’ questions and
              statements about Element AI.
            </Typography>
            <Typography
              align="center"
              variant="body1"
              color="textSecondary"
              gutterBottom
            >
              The conditions for using this tool are to: (1) operate on a basis
              of assuming positive intentions, (2) be respectful of one another,
              and (3) take the time to ensure that questions and answers are
              relevant, useful and constructive.
            </Typography>
            <Typography align="center" color="textSecondary" variant="body1">
              The portal is anonymous.
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
