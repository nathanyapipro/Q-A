import * as React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";
import CssBaseline from "@material-ui/core/CssBaseline";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true
  },
  palette: {
    primary: deepPurple,
    secondary: {
      light: grey[500],
      main: grey[600],
      dark: grey[700],
      contrastText: "white"
    }
  },
  overrides: {
    MuiAppBar: {
      root: {
        boxShadow: "unset"
      },
      colorDefault: {
        backgroundColor: "transparent"
      }
    },
    MuiAvatar: {
      root: {
        borderRadius: 0
      }
    }
  }
});

const useStyles = makeStyles({
  "@global": {
    html: {
      display: "flex",
      flex: "1 0 auto",
      height: "100%"
    },
    body: {
      display: "flex",
      flex: "1 0 auto"
    },
    "#root": {
      display: "flex",
      flex: "1 0 auto"
    },
    a: {
      color: "inherit",
      textDecoration: "inherit"
    }
  }
});

interface WrappedComponentProps {}

function withTheme<P extends WrappedComponentProps>(
  Component: React.ComponentType<P>
) {
  function WithTheme(props: P) {
    useStyles({});

    return (
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...props} />
        </ThemeProvider>
      </MuiThemeProvider>
    );
  }

  return WithTheme;
}

export default withTheme;
