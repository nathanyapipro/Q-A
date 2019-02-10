import * as React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider, makeStyles } from "@material-ui/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";
import CssBaseline from "@material-ui/core/CssBaseline";
import spacing from "@material-ui/core/styles/spacing";

const theme = createMuiTheme({
  typography: {
    useNextVariants: true,
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"'
    ].join(",")
  },
  palette: {
    primary: deepPurple,
    secondary: {
      light: grey[900],
      main: grey[700],
      dark: grey[800],
      contrastText: "white"
    }
  },
  overrides: {
    MuiAppBar: {
      root: {},
      colorDefault: {
        backgroundColor: grey[900],
        color: "white"
      }
    },
    MuiAvatar: {
      root: {
        borderRadius: 0
      }
    },
    MuiTable: {
      root: {
        tableLayout: "fixed",
        position: "relative"
      }
    },
    MuiTableRow: {
      root: {}
    },
    MuiTableCell: {
      root: {
        paddingTop: spacing.unit,
        paddingBottom: spacing.unit
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
    useStyles();

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
