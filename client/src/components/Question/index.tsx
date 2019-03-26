import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Content from "../Question/Content";
import Actions from "../Question/Actions";
import Tags from "../Question/Tags";
import Status from "../Question/Status";
import { compose } from "react-apollo";
import * as withQuestionByIdQuery from "../../queries/withQuestionByIdQuery";
import { Typography } from "@material-ui/core";
import { fromNow } from "../../helpers/date";
import Field from "../Field";
import UpdateQuestionContentForm from "../../forms/UpdateQuestionContent";
import UpdateQuestionStatusForm from "../../forms/UpdateQuestionStatus";
import UpdateQuestionTagsForm from "../../forms/UpdateQuestionTags";
import Answers from "../Answers";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { CurrentUser } from "../../states/global/reducer";
import { RoleType } from "../../types/apollo";

interface OwnProps {}

type ReduxStateProps = {
  workspaceId: number;
  currentUser?: CurrentUser;
};

interface ReduxDispatchProps {}

type Props = OwnProps &
  withQuestionByIdQuery.ChildProps &
  RouteComponentProps &
  ReduxStateProps &
  ReduxDispatchProps;

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
  const { questionById, workspaceId, history, currentUser } = props;

  if (!currentUser) {
    return <noscript />;
  }

  if (!questionById) {
    return <noscript />;
  }

  if (workspaceId !== questionById.workspaceId) {
    history.push("/questions");
  }

  const { id: questionId, content, createdAt, updatedAt } = questionById;

  const status = questionById.status && questionById.status.status;
  const statusId = questionById.status && questionById.status.id;

  if (!statusId) {
    return <noscript />;
  }
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
  const tagIds =
    questionById.tagIds !== null
      ? questionById.tagIds.reduce((acc: Array<number>, id: number | null) => {
          if (id !== null) {
            acc = [...acc, id];
          }
          return acc;
        }, [])
      : [];

  const canEditStatus = currentUser.role !== RoleType.ANONYMOUS;
  const canEditContent =
    currentUser.id === questionById.userId &&
    questionById.voteCount === 0 &&
    questionById.answers.nodes.length === 0;
  const canEditTags =
    currentUser.role !== RoleType.ANONYMOUS ||
    currentUser.id === questionById.userId;

  return (
    <div className={classes.container}>
      <Field
        label="Status"
        staticComponent={<Status status={status} />}
        editComponent={
          canEditStatus ? (
            <UpdateQuestionStatusForm
              questionId={questionId}
              initialValue={statusId}
            />
          ) : (
            undefined
          )
        }
      />
      <Field
        label="Question"
        staticComponent={<Content content={content} />}
        editComponent={
          canEditContent ? (
            <UpdateQuestionContentForm
              questionId={questionId}
              initialValue={content}
            />
          ) : (
            undefined
          )
        }
      />
      <Field
        label="Tags"
        staticComponent={<Tags questionTags={questionTags} />}
        editComponent={
          canEditTags ? (
            <UpdateQuestionTagsForm
              questionId={questionId}
              initialValue={tagIds}
            />
          ) : (
            undefined
          )
        }
      />
      <Answers questionId={questionId} />
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
        label="Actions"
        staticComponent={
          <Actions
            userId={questionById.userId}
            status={status}
            questionId={questionId}
            voteCount={voteCount}
            commentCount={commentCount}
            hasVoted={hasVoted}
          />
        }
      />
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    workspaceId: state.global.workspaceId,
    currentUser: state.global.auth.currentUser
  };
};

const Question: React.ComponentType<
  OwnProps & withQuestionByIdQuery.InputProps
> = compose(
  withQuestionByIdQuery.hoc,
  withRouter,
  connect(
    mapStateToProps,
    {}
  )
)(QuestionBase);

export default Question;
