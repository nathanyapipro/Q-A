import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { fromNow } from "../../helpers/date";
import { Theme } from "@material-ui/core/styles";

interface OwnProps {
  content: string;
  createdAt: string;
}

type Props = OwnProps;

const useStyles = makeStyles((_: Theme) => ({
  bold: {
    fontWeight: 600
  },
  createdAt: {
    display: "unset",
    marginBottom: 0,
    alignSelf: "flex-end"
  }
}));

function ContentBase(props: Props) {
  const classes = useStyles();

  const { content, createdAt } = props;

  return (
    <Typography
      className={classes.bold}
      variant="subtitle1"
      component="p"
      color="secondary"
    >
      {content}
      <Typography
        className={classes.createdAt}
        component="span"
        variant="caption"
        gutterBottom
      >
        &nbsp;&nbsp;– &nbsp; {fromNow(createdAt)}
      </Typography>
    </Typography>
  );
}

const Content = ContentBase;

export default Content;
