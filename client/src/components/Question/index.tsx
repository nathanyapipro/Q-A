import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Content from "../Question/Content";
import Actions from "../Question/Actions";
import Tags from "../Question/Tags";
import Status from "../Question/Status";
import { compose } from "react-apollo";
import {
  withQuestionByIdQuery,
  WithQuestionByIdQuery
} from "../../queries/withQuestionByIdQuery";
import { Typography } from "@material-ui/core";
import { fromNow } from "../../helpers/date";

interface OwnProps {
  questionId: number;
}

type Props = OwnProps & WithQuestionByIdQuery;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit * 2,
    flexBasis: "50%"
  },
  staticField: {
    display: "flex",
    flexDirection: "column",
    marginBottom: theme.spacing.unit * 2,
    "&:last-child": {
      marginBottom: 0
    }
  },
  bold: {
    fontWeight: 600
  },
  negativeGutterButton: {
    marginBottom: -theme.spacing.unit
  }
}));

function QuestionBase(props: Props) {
  const classes = useStyles();
  const { questionById } = props;

  if (!questionById) {
    return <noscript />;
  }

  const { id, content, createdAt, updatedAt } = questionById;

  const status = questionById.status && questionById.status.name;

  if (!status) {
    return <noscript />;
  }
  const commentCount =
    questionById.comments && questionById.comments.totalCount
      ? questionById.comments.totalCount
      : 0;
  const hasVoted = questionById.hasVoted ? questionById.hasVoted : false;
  const voteCount = questionById.voteCount ? questionById.voteCount : 0;
  const questionTags = questionById.questionTags.nodes;
  const answer =
    questionById.answers &&
    questionById.answers.nodes &&
    questionById.answers.nodes[0]
      ? questionById.answers.nodes[0]
      : undefined;

  return (
    <div className={classes.container}>
      <div className={classes.staticField}>
        <Typography color="secondary" variant="caption">
          Status
        </Typography>
        <Status status={status} />
      </div>
      <div className={classes.staticField}>
        <Typography
          className={classes.negativeGutterButton}
          color="secondary"
          variant="caption"
        >
          Question
        </Typography>
        <Content content={content} />
      </div>
      <div className={classes.staticField}>
        <Typography color="secondary" variant="caption">
          Tags
        </Typography>
        <Tags questionTags={questionTags} />
      </div>
      <div className={classes.staticField}>
        <Typography
          className={classes.negativeGutterButton}
          color="secondary"
          variant="caption"
        >
          Answer
        </Typography>
        <Typography
          className={classes.bold}
          variant="subtitle1"
          component="p"
          color="secondary"
        >
          {answer ? answer.content : "None"}
        </Typography>
      </div>
      <div className={classes.staticField}>
        <Typography
          className={classes.negativeGutterButton}
          color="secondary"
          variant="caption"
        >
          Created
        </Typography>
        <Typography
          className={classes.bold}
          variant="subtitle1"
          component="p"
          color="secondary"
        >
          {fromNow(createdAt)}
        </Typography>
      </div>
      <div className={classes.staticField}>
        <Typography
          className={classes.negativeGutterButton}
          color="secondary"
          variant="caption"
        >
          Updated
        </Typography>
        <Typography
          className={classes.bold}
          variant="subtitle1"
          component="p"
          color="secondary"
        >
          {fromNow(updatedAt)}
        </Typography>
      </div>
      <div className={classes.staticField}>
        <Typography color="secondary" variant="caption">
          Votes & Comments
        </Typography>
        <Actions
          id={id}
          voteCount={voteCount}
          commentCount={commentCount}
          hasVoted={hasVoted}
        />
      </div>
    </div>
  );
}

const Question: React.ComponentType<OwnProps> = compose(withQuestionByIdQuery)(
  QuestionBase
);

export default Question;
