import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { compose } from "react-apollo";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

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
  heading: {
    flexGrow: 1,
    paddingRight: theme.spacing.unit * 2,
    flexShrink: 0
  },
  secondaryHeading: {
    color: theme.palette.text.secondary
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
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography noWrap variant="subheading" className={classes.heading}>
              General
            </Typography>
            <Typography
              noWrap
              variant="subheading"
              color="secondary"
              className={classes.secondaryHeading}
            >
              App Level Configuration
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nulla facilisi. Phasellus sollicitudin nulla et quam mattis
              feugiat. Aliquam eget maximus est, id dignissim quam.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className={classes.expansionPanel}>
        <ExpansionPanel
          expanded={Boolean(panelExpanded === "users")}
          onChange={handleChange("users")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography noWrap variant="subheading" className={classes.heading}>
              Users
            </Typography>
            <Typography
              noWrap
              variant="subheading"
              color="secondary"
              className={classes.secondaryHeading}
            >
              Create/Update Non-Annonymous Users for the App
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Donec placerat, lectus sed mattis semper, neque lectus feugiat
              lectus, varius pulvinar diam eros in elit. Pellentesque convallis
              laoreet laoreet.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
      <div className={classes.expansionPanel}>
        <ExpansionPanel
          expanded={Boolean(panelExpanded === "workpace-configuration")}
          onChange={handleChange("workpace-configuration")}
        >
          <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
            <Typography noWrap variant="subheading" className={classes.heading}>
              Workpace Configuration
            </Typography>
            <Typography
              noWrap
              variant="subheading"
              color="secondary"
              className={classes.secondaryHeading}
            >
              Configure Manager, Tags, Access Restrictions
            </Typography>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails>
            <Typography>
              Nunc vitae orci ultricies, auctor nunc in, volutpat nisl. Integer
              sit amet egestas eros, vitae egestas augue. Duis vel est augue.
            </Typography>
          </ExpansionPanelDetails>
        </ExpansionPanel>
      </div>
    </div>
  );
}

const Settings: React.ComponentType<OwnProps> = compose()(SettingsBase);

export default Settings;
