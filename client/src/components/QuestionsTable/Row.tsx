import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import {
  Questions_questions_nodes,
  Questions_questions_nodes_questionTags_nodes
} from "../../types/apollo/Questions";
import Tag from "../../components/Tag";
import Status from "../../components/Status";
import Button from "@material-ui/core/Button";
import VoteIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";
import { fromNow } from "../../helpers/date";
import { Theme } from "@material-ui/core/styles";
import { compose } from "react-apollo";
import {
  withQuestionToggleVoteMutation,
  WithQuestionToggleVoteMutation
} from "../../queries/withQuestionToggleVoteMutation";

interface OwnProps {
  data: Questions_questions_nodes;
}

type Props = OwnProps & WithQuestionToggleVoteMutation;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    cursor: "pointer",
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[100]
    }
  },

  tableCell: {
    padding: `${theme.spacing.unit * 2}px !important`,
    display: "flex",
    flexDirection: "row"
  },
  status: {
    padding: `${theme.spacing.unit / 2}px ${theme.spacing.unit * 1.5}px ${theme
      .spacing.unit / 2}px ${0}px`
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
  },
  bold: {
    fontWeight: 600
  },
  actions: {
    display: "flex",
    flexDirection: "row"
  },
  button: {
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit}px`,
    "&:not(:first-child)": {
      marginLeft: theme.spacing.unit
    }
  },
  createdAt: {
    display: "unset",
    marginBottom: 0,
    alignSelf: "flex-end"
  },
  buttonIcon: {
    marginRight: theme.spacing.unit * 1.5,
    height: "0.75em",
    width: "0.75em"
  },
  tags: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "flex-start",
    margin: -theme.spacing.unit / 2,
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing.unit
    }
  }
}));

function RowBase(props: Props) {
  const classes = useStyles();
  const { data, questionToggleVote } = props;

  const {
    id,
    content,
    hasVoted,
    voteCount,
    comments,
    questionTags,
    status,
    createdAt
  } = data;

  if (!status) {
    return <noscript />;
  }

  const commentCount = comments.totalCount;

  const tags = questionTags.nodes;

  function renderTags() {
    return tags.map(
      (questionTag: Questions_questions_nodes_questionTags_nodes) =>
        questionTag.tag && (
          <Tag key={`questionTag-${questionTag.id}`} {...questionTag.tag} />
        )
    );
  }

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
    <TableRow className={classes.container} hover>
      <TableCell className={classes.tableCell}>
        <div className={classes.status}>
          <Status name={status.name} />
        </div>
        <div className={classes.content}>
          <Typography
            className={classes.bold}
            variant="subtitle1"
            component="p"
            color="secondary"
          >
            {content}
            <Typography
              className={classes.createdAt}
              component="span"
              variant="caption"
              gutterBottom
            >
              &nbsp;&nbsp;– &nbsp; {fromNow(createdAt)}
            </Typography>
          </Typography>
          <div className={classes.footer}>
            <div className={classes.actions}>
              <Button
                variant="outlined"
                color={hasVoted ? "primary" : "secondary"}
                className={classes.button}
                onClick={handleVoteClick}
              >
                <VoteIcon className={classes.buttonIcon} color="inherit" />
                <Typography
                  className={classes.bold}
                  color="inherit"
                  variant="body1"
                >
                  {voteCount}
                </Typography>
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                className={classes.button}
              >
                <CommentIcon className={classes.buttonIcon} color="inherit" />
                <Typography
                  className={classes.bold}
                  color="inherit"
                  variant="body1"
                >
                  {commentCount}
                </Typography>
              </Button>
            </div>
            <div className={classes.spacer} />
            <div className={classes.tags}>{renderTags()}</div>
          </div>
        </div>
      </TableCell>
    </TableRow>
  );
}

const Row: React.ComponentType<OwnProps> = compose(
  withQuestionToggleVoteMutation
)(RowBase);

export default Row;
