import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import { Answers_answers_nodes } from "../../types/apollo/Answers";
import UpdateAnswerForm from "../../forms/UpdateAnswer";
import { fromNow } from "../../helpers/date";
import { getUsername } from "../../helpers/user";
import Actions from "./Actions";

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
    backgroundColor: theme.palette.grey[200],
    marginBottom: theme.spacing.unit / 4
  },
  content: {},
  answer: {
    wordWrap: "break-word",
    whiteSpace: "pre-wrap"
  },
  author: {
    fontWeight: 600
  },
  footer: {
    display: "flex",
    flexDirection: "row"
  },
  updatedAt: {},
  spacer: {
    flexGrow: 1
  }
}));

function AnswerBase(props: Props) {
  const classes = useStyles();

  const {
    data
    // currentUserId
  } = props;

  const { id: answerId, questionId, content, user, updatedAt } = data;

  if (!user) {
    return <noscript />;
  }

  // const isOwner = user.id === currentUserId;

  const username = getUsername(user.username, user.role);

  const [isEditing, setIsEditing] = React.useState<boolean>(false);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

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
        {isEditing ? (
          <UpdateAnswerForm
            answerId={answerId}
            initialValue={content}
            onExit={toggleEdit}
          />
        ) : (
          <Typography
            color="inherit"
            variant="body2"
            component="p"
            className={classes.content}
          >
            {content}
          </Typography>
        )}
      </Paper>
      <div className={classes.footer}>
        <Typography
          className={classes.updatedAt}
          component="span"
          variant="caption"
        >
          {fromNow(updatedAt)}
        </Typography>
        <div className={classes.spacer} />
        <Actions
          isEditing={isEditing}
          answerId={answerId}
          questionId={questionId}
          onEdit={toggleEdit}
        />
      </div>
    </div>
  );
}

const Answer = AnswerBase;

export default Answer;
