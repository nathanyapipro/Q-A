import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import VoteIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import { Theme } from "@material-ui/core/styles";
import { compose } from "react-apollo";
import {
  withQuestionToggleVoteMutation,
  WithQuestionToggleVoteMutation
} from "../../queries/withQuestionToggleVoteMutation";

interface OwnProps {
  id: number;
  hasVoted: boolean;
  voteCount: number;
  commentCount: number;
}

type Props = OwnProps & WithQuestionToggleVoteMutation;

const useStyles = makeStyles((theme: Theme) => ({
  bold: {
    fontWeight: 600
  },
  container: {
    display: "flex",
    flexDirection: "row"
  },
  button: {
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit}px`,
    "&:not(:first-child)": {
      marginLeft: theme.spacing.unit
    }
  },
  buttonIcon: {
    marginRight: theme.spacing.unit * 1.5,
    height: "0.75em",
    width: "0.75em"
  }
}));

function ActionsBase(props: Props) {
  const classes = useStyles();

  const { id, hasVoted, voteCount, commentCount, questionToggleVote } = props;

  function handleVoteClick(e: React.MouseEvent<HTMLElement, MouseEvent>) {
    e.stopPropagation();
    questionToggleVote({
      variables: {
        questionToggleVoteInput: {
          questionId: id
        }
      }
    });
  }

  return (
    <div className={classes.container}>
      <Button
        variant="outlined"
        color={hasVoted ? "primary" : "secondary"}
        className={classes.button}
        onClick={handleVoteClick}
      >
        <VoteIcon className={classes.buttonIcon} color="inherit" />
        <Typography className={classes.bold} color="inherit" variant="body1">
          {voteCount}
        </Typography>
      </Button>
      <Button variant="outlined" color="secondary" className={classes.button}>
        <CommentIcon className={classes.buttonIcon} color="inherit" />
        <Typography className={classes.bold} color="inherit" variant="body1">
          {commentCount}
        </Typography>
      </Button>
    </div>
  );
}

const Actions: React.ComponentType<OwnProps> = compose(
  withQuestionToggleVoteMutation
)(ActionsBase);

export default Actions;
