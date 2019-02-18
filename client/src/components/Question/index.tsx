import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Content from "../Question/Content";
import ContentForm from "../Question/ContentForm";
import Actions from "../Question/Actions";
import Tags from "../Question/Tags";
import Status from "../Question/Status";
import { compose } from "react-apollo";
import * as withQuestionByIdQuery from "../../queries/withQuestionByIdQuery";
import { Typography } from "@material-ui/core";
import { fromNow } from "../../helpers/date";
import Field from "../Field";

interface OwnProps {
  questionId: number;
}

type Props = OwnProps & withQuestionByIdQuery.ChildProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up("sm")]: {
      width: "50%",
      maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme
        .spacing.unit * 6}px)`,
      overflowY: "auto"
    }
  },
  staticField: {
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    marginBottom: theme.spacing.unit * 2,
    "&:last-child": {
      marginBottom: 0
    }
  },
  negativeGutterButton: {
    marginBottom: -theme.spacing.unit / 2
  }
}));

function QuestionBase(props: Props) {
  const classes = useStyles();
  const { questionById } = props;

  if (!questionById) {
    return <noscript />;
  }

  const { id, content, createdAt, updatedAt } = questionById;

  const status = questionById.status && questionById.status.status;

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
      <Field
        label="Status"
        staticComponent={<Status status={status} />}
        // editComponent={<ContentForm initialValue={content} />}
      />
      <Field
        label="Question"
        staticComponent={<Content content={content} />}
        editComponent={<ContentForm questionId={id} initialValue={content} />}
      />
      <Field
        label="Tags"
        staticComponent={<Tags questionTags={questionTags} />}
        // editComponent={<ContentForm initialValue={content} />}
      />
      <Field
        label="Answer"
        staticComponent={
          <Typography variant="subtitle1" component="p">
            {answer ? answer.content : "None"}
          </Typography>
        }
        // editComponent={<ContentForm initialValue={content} />}
      />
      <Field
        label="Created"
        staticComponent={
          <Typography variant="subtitle1" component="p">
            {fromNow(createdAt)}
          </Typography>
        }
      />
      <Field
        label="Updated"
        staticComponent={
          <Typography variant="subtitle1" component="p">
            {fromNow(updatedAt)}
          </Typography>
        }
      />
      <Field
        label="Votes & Comments"
        staticComponent={
          <Actions
            id={id}
            voteCount={voteCount}
            commentCount={commentCount}
            hasVoted={hasVoted}
          />
        }
      />
    </div>
  );
}

const Question: React.ComponentType<
  OwnProps & withQuestionByIdQuery.InputProps
> = compose(withQuestionByIdQuery.hoc)(QuestionBase);

export default Question;
