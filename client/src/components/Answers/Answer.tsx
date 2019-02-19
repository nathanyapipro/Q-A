import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import { Answers_answers_nodes } from "../../types/apollo/Answers";
import { fromNow } from "../../helpers/date";

interface OwnProps {
  data: Answers_answers_nodes;
  currentUserId: number;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    padding: `${theme.spacing.unit / 2}px 0px`,
    margin: `0px ${theme.spacing.unit}px`
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.grey[200]
  },
  answer: {
    wordWrap: "break-word",
    whiteSpace: "pre-wrap"
  },
  updatedAt: {},
  author: {
    fontWeight: 600
  }
}));

function AnswerBase(props: Props) {
  const classes = useStyles();

  const { data, currentUserId } = props;

  const { id: answerId, questionId, content, user, updatedAt } = data;

  if (!user) {
    return <noscript />;
  }

  const isOwner = user.id === currentUserId;

  const username = user.username;

  console.log(answerId, questionId, content, username, isOwner, updatedAt);

  // const [isEditing, setIsEditing] = React.useState<boolean>(false);

  // function toggleEdit() {
  //   setIsEditing(!isEditing);
  // }

  return (
    <div className={classNames(classes.container)}>
      <Typography
        component="span"
        color="primary"
        variant="caption"
        className={classes.author}
      >
        {username}
      </Typography>
      <Paper elevation={0} className={classNames(classes.paper)}>
        <Typography
          variant="subtitle1"
          component="pre"
          className={classes.answer}
        >
          {content}
        </Typography>
      </Paper>
      <Typography
        className={classes.updatedAt}
        component="span"
        variant="caption"
      >
        {fromNow(updatedAt)}
      </Typography>
    </div>
  );
}

const Answer = AnswerBase;

export default Answer;
