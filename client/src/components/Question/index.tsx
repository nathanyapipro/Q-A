import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Paper from "@material-ui/core/Paper";
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

interface OwnProps {
  questionId: number;
}

type Props = OwnProps & WithQuestionByIdQuery;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    padding: `${theme.spacing.unit * 2}px !important`,
    display: "flex",
    flexDirection: "column"
  },
  status: {
    display: "flex",
    marginBottom: theme.spacing.unit
  },
  content: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  footer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: theme.spacing.unit,
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column-reverse",
      alignItems: "unset"
    }
  },
  spacer: {
    flexGrow: 1
  }
}));

function QuestionBase(props: Props) {
  const classes = useStyles();
  const { questionById } = props;

  if (!questionById) {
    return <noscript />;
  }

  const { id, content, createdAt } = questionById;

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

  return (
    <Paper elevation={1} className={classes.container}>
      <div className={classes.status}>
        <Status status={status} />
      </div>
      <div className={classes.content}>
        <Content content={content} createdAt={createdAt} />
        <div className={classes.footer}>
          <Actions
            id={id}
            voteCount={voteCount}
            commentCount={commentCount}
            hasVoted={hasVoted}
          />
          <div className={classes.spacer} />
          <Tags questionTags={questionTags} />
        </div>
      </div>
    </Paper>
  );
}

const Question: React.ComponentType<OwnProps> = compose(withQuestionByIdQuery)(
  QuestionBase
);

export default Question;
