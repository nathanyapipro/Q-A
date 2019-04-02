import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles";
import Tooltip from "@material-ui/core/Tooltip";

interface OwnProps {
  name: string;
  color: string;
  description: string | null;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    margin: theme.spacing.unit / 2,
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit}px`,
    color: theme.palette.common.white
  },
  text: {
    fontWeight: theme.typography.fontWeightMedium
  }
}));

function TagBase(props: Props) {
  const classes = useStyles();
  const { name, color, description } = props;

  return (
    <Tooltip
      title={
        <Typography color="textSecondary" variant="caption">
          {description}
        </Typography>
      }
      placement="bottom"
    >
      <Paper
        elevation={1}
        style={{ backgroundColor: color }}
        className={classes.container}
      >
        <Typography className={classes.text} color="inherit" noWrap>
          {name}
        </Typography>
      </Paper>
    </Tooltip>
  );
}

const Tag = TagBase;

export default Tag;
