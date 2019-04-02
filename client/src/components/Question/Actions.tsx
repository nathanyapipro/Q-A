import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import VoteIcon from "@material-ui/icons/ThumbUp";
import DeleteIcon from "@material-ui/icons/Delete";
import CommentIcon from "@material-ui/icons/Comment";
import { Theme } from "@material-ui/core/styles";
import { compose } from "react-apollo";
import * as withQuestionToggleVoteMutation from "../../queries/withQuestionToggleVoteMutation";
import * as withDeleteQuestionByIdMutation from "../../queries/withDeleteQuestionByIdMutation";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { CurrentUser } from "../../states/global/reducer";
import { StatusType } from "../../types/apollo";

type ReduxStateProps = {
  currentUser?: CurrentUser;
};

interface OwnProps {
  questionId: number;
  status: StatusType;
  userId?: number;
  hasVoted: boolean;
  voteCount: number;
  commentCount: number;
}

type Props = OwnProps &
  withQuestionToggleVoteMutation.ChildProps &
  withDeleteQuestionByIdMutation.ChildProps &
  RouteComponentProps &
  ReduxStateProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexFlow: "row-wrap"
  },
  button: {
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit}px`,
    "&:not(:first-child)": {
      marginLeft: theme.spacing.unit
    },
    textTransform: "unset"
  },
  buttonIcon: {
    marginRight: theme.spacing.unit,
    height: "0.75em",
    width: "0.75em"
  },
  spacer: {
    flexGrow: 1
  }
}));

function ActionsBase(props: Props) {
  const classes = useStyles();

  const {
    questionId,
    status,
    userId,
    hasVoted,
    voteCount,
    commentCount,
    questionToggleVote,
    deleteQuestion,
    history,
    currentUser,
    location: { pathname }
  } = props;

  const isQuestionByIdPage = pathname !== "/questions";

  function handleVoteClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.preventDefault();
    e.stopPropagation();
    questionToggleVote({
      variables: {
        questionToggleVoteInput: {
          questionId
        }
      }
    });
  }

  async function handleDeleteClick(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    const response = await deleteQuestion({
      variables: {
        deleteQuestionByIdInput: {
          id: questionId
        }
      }
    });
    if (response && response.data && response.data.deleteQuestionById) {
      if (pathname !== "/questions") {
        history.push("/questions");
      }
    }
  }

  if (!currentUser) {
    return <noscript />;
  }

  const canDeleteQuestion = currentUser.id === userId;
  const canBeVotedOn = status === StatusType.NEW;

  return (
    <div className={classes.container}>
      <Button
        variant="text"
        color={hasVoted ? "primary" : "secondary"}
        className={classes.button}
        onClick={handleVoteClick}
        disabled={!canBeVotedOn}
      >
        <VoteIcon className={classes.buttonIcon} color="inherit" />
        <Typography noWrap color="inherit" variant="body1">
          {`${voteCount} Like${voteCount > 1 ? "s" : ""}`}
        </Typography>
      </Button>
      <Button variant="text" color="secondary" className={classes.button}>
        <CommentIcon className={classes.buttonIcon} color="inherit" />
        <Typography noWrap color="textSecondary" variant="body1">
          {`${commentCount} Comment${commentCount > 1 ? "s" : ""}`}
        </Typography>
      </Button>
      {isQuestionByIdPage && (
        <React.Fragment>
          <div className={classes.spacer} />
          {canDeleteQuestion && (
            <Button
              variant="text"
              color={"secondary"}
              className={classes.button}
              onClick={handleDeleteClick}
            >
              <DeleteIcon className={classes.buttonIcon} color="inherit" />
              <Typography noWrap color="inherit" variant="body1">
                Delete
              </Typography>
            </Button>
          )}
        </React.Fragment>
      )}
    </div>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    currentUser: state.global.auth.currentUser
  };
};

const Actions: React.ComponentType<
  OwnProps &
    withQuestionToggleVoteMutation.InputProps &
    withDeleteQuestionByIdMutation.InputProps
> = compose(
  connect(
    mapStateToProps,
    {}
  ),
  withRouter,
  withQuestionToggleVoteMutation.hoc,
  withDeleteQuestionByIdMutation.hoc
)(ActionsBase);

export default Actions;
