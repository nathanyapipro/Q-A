import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { compose } from "react-apollo";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import Users from "./Users";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  expansionPanel: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing.unit * 2
  },
  expansionPanelSumaryContent: {
    alignItems: "center"
  },
  expansionPanelSumaryRoot: {
    "&$expansionPanelSumaryExpanded": {
      borderBottom: `1px solid ${theme.palette.divider}`
    }
  },
  expansionPanelSumaryExpanded: {},
  expansionPanelDetailsRoot: {
    padding: 0
  },
  heading: {
    paddingRight: theme.spacing.unit * 2,
    flexShrink: 0
  },
  addButton: {
    paddingRight: `${theme.spacing.unit}px !important`,
    marginRight: theme.spacing.unit * 4
  }
}));

function SettingsBase(_: Props) {
  const classes = useStyles();

  const [panelExpanded, setPanelExpanded] = React.useState<string | undefined>(
    "workpace-configuration"
  );

  const handleChange = (panel: string) => (
    _: React.ChangeEvent<{}>,
    expanded: boolean
  ) => {
    setPanelExpanded(expanded ? panel : undefined);
  };

  return (
    <div className={classes.container}>
      <div className={classes.expansionPanel}>
        <ExpansionPanel
          expanded={Boolean(panelExpanded === "general")}
          onChange={handleChange("general")}
        >
          <ExpansionPanelSummary
            classes={{
              content: classes.expansionPanelSumaryContent,
              expanded: classes.expansionPanelSumaryExpanded,
              root: classes.expansionPanelSumaryRoot
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography noWrap variant="subheading" className={classes.heading}>
              General
            </Typography>
            <Typography noWrap variant="caption" color="textSecondary">
              App Level Configuration
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails />
        </ExpansionPanel>
      </div>
      <div className={classes.expansionPanel}>
        <ExpansionPanel
          expanded={Boolean(panelExpanded === "users")}
          onChange={handleChange("users")}
        >
          <ExpansionPanelSummary
            classes={{
              content: classes.expansionPanelSumaryContent,
              expanded: classes.expansionPanelSumaryExpanded,
              root: classes.expansionPanelSumaryRoot
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography noWrap variant="subheading" className={classes.heading}>
              Users
            </Typography>
            <Typography noWrap variant="caption" color="textSecondary">
              Configure Users of the App
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails
            classes={{
              root: classes.expansionPanelDetailsRoot
            }}
          >
            <Users />
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className={classes.expansionPanel}>
        <ExpansionPanel
          expanded={Boolean(panelExpanded === "workpace-configuration")}
          onChange={handleChange("workpace-configuration")}
        >
          <ExpansionPanelSummary
            classes={{
              content: classes.expansionPanelSumaryContent,
              expanded: classes.expansionPanelSumaryExpanded,
              root: classes.expansionPanelSumaryRoot
            }}
            expandIcon={<ExpandMoreIcon />}
          >
            <Typography noWrap variant="subheading" className={classes.heading}>
              Workspace Configuration
            </Typography>
            <Typography noWrap variant="caption" color="textSecondary">
              Configure Workspace Access Restrictions and Tags
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails />
        </ExpansionPanel>
      </div>
    </div>
  );
}

const Settings: React.ComponentType<OwnProps> = compose()(SettingsBase);

export default Settings;
