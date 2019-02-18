import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { fromNow } from "../../helpers/date";
import { Theme } from "@material-ui/core/styles";

interface OwnProps {
  content: string;
  createdAt?: string;
}

type Props = OwnProps;

const useStyles = makeStyles((_: Theme) => ({
  createdAt: {
    display: "unset",
    alignSelf: "flex-end"
  }
}));

function ContentBase(props: Props) {
  const classes = useStyles();

  const { content, createdAt } = props;

  return (
    <Typography variant="subtitle1" component="p">
      {content}
      {createdAt && (
        <Typography
          className={classes.createdAt}
          component="span"
          variant="caption"
        >
          &nbsp;&nbsp;– &nbsp; {fromNow(createdAt)}
        </Typography>
      )}
    </Typography>
  );
}

const Content = ContentBase;

export default Content;
