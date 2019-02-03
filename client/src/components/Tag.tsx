import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

interface TagProps {
  name: string;
  color: string;
}

type Props = TagProps;

const useStyles = makeStyles(theme => ({
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
  const classes = useStyles({});
  const { name, color } = props;

  return (
    <Paper
      elevation={1}
      style={{ backgroundColor: color }}
      className={classes.container}
    >
      <Typography className={classes.text} color="inherit" noWrap>
        {name}
      </Typography>
    </Paper>
  );
}

const Tag = TagBase;

export default Tag;
