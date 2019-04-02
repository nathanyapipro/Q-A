import * as React from "react";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/styles";
import deepPurple from "@material-ui/core/colors/deepPurple";
import grey from "@material-ui/core/colors/grey";
import CssBaseline from "@material-ui/core/CssBaseline";
import spacing from "@material-ui/core/styles/spacing";
import { theme as defaultTheme, useGlobalStyles } from "@eai-material-ui/theme";

const theme = createMuiTheme({
  ...defaultTheme,
  palette: {
    ...defaultTheme.palette,
    primary: deepPurple,
    secondary: {
      light: grey[600],
      main: grey[700],
      dark: grey[800],
      contrastText: "white"
    }
  },
  typography: {
    ...defaultTheme.typography,
    caption: {
      ...defaultTheme.typography.caption,
      fontWeight: defaultTheme.typography.fontWeightLight
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
    MuiPaper: {
      root: {
        color: "inherit"
      }
    },
    MuiInputBase: {
      root: {
        ...defaultTheme.typography.body1
      },
      multiline: {
        padding: `${defaultTheme.spacing.unit}px`
      }
    },
    MuiOutlinedInput: {
      multiline: {
        padding: `${defaultTheme.spacing.unit}px`
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

interface WrappedComponentProps {}

function withTheme<P extends WrappedComponentProps>(
  Component: React.ComponentType<P>
) {
  function WithTheme(props: P) {
    useGlobalStyles();

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
