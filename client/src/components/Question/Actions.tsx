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

interface OwnProps {
  questionId: number;
  hasVoted: boolean;
  voteCount: number;
  commentCount: number;
}

type Props = OwnProps &
  withQuestionToggleVoteMutation.ChildProps &
  withDeleteQuestionByIdMutation.ChildProps &
  RouteComponentProps;

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
    hasVoted,
    voteCount,
    commentCount,
    questionToggleVote,
    deleteQuestion,
    history,
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

  return (
    <div className={classes.container}>
      <Button
        variant="text"
        color="primary"
        className={classes.button}
        onClick={handleVoteClick}
      >
        <VoteIcon
          className={classes.buttonIcon}
          color={hasVoted ? "primary" : "secondary"}
        />
        <Typography
          noWrap
          color={hasVoted ? "primary" : "secondary"}
          variant="body1"
        >
          {`${voteCount} Like`}
        </Typography>
      </Button>
      <Button variant="text" color="secondary" className={classes.button}>
        <CommentIcon className={classes.buttonIcon} color="inherit" />
        <Typography noWrap color="secondary" variant="body1">
          {`${commentCount} Comment`}
        </Typography>
      </Button>
      {isQuestionByIdPage && (
        <React.Fragment>
          <div className={classes.spacer} />
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
        </React.Fragment>
      )}
    </div>
  );
}

const Actions: React.ComponentType<
  OwnProps &
    withQuestionToggleVoteMutation.InputProps &
    withDeleteQuestionByIdMutation.InputProps
> = compose(
  withRouter,
  withQuestionToggleVoteMutation.hoc,
  withDeleteQuestionByIdMutation.hoc
)(ActionsBase);

export default Actions;
