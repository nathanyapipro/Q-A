import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import classNames from "classnames";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import {
  Questions_questions_nodes,
  Questions_questions_nodes_questionTags_nodes
} from "../../types/Questions";
import Tag from "../../components/Tag";
import Status from "../../components/Status";
import Button from "@material-ui/core/Button";
import VoteIcon from "@material-ui/icons/ThumbUp";
import CommentIcon from "@material-ui/icons/Comment";

interface RowProps {
  data: Questions_questions_nodes;
}

type Props = RowProps;

const useStyles = makeStyles(theme => ({
  container: {
    cursor: "pointer",
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[50]
    }
  },
  tableCell: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  description: {
    display: "flex",
    flexDirection: "row"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  },
  footer: {
    display: "flex",
    flexDirection: "row"
  },
  bold: {
    fontWeight: 600
  },
  footerButton: {
    padding: `${theme.spacing.unit / 4}px ${theme.spacing.unit}px`,
    "&:not(:first-child)": {
      marginLeft: theme.spacing.unit
    }
  },
  buttonIcon: {
    marginRight: theme.spacing.unit * 1.5,
    height: "0.75em",
    width: "0.75em"
  },
  vAlignTop: {
    verticalAlign: "top"
  },
  tags: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "flex-start"
  }
}));

function RowBase(props: Props) {
  const classes = useStyles({});
  const { data } = props;

  const { content, votes, comments, questionTags, status } = data;

  const voteCount = votes.totalCount;
  const commentCount = comments.totalCount;

  const tags = questionTags.nodes;

  return (
    <TableRow className={classes.container} hover>
      <TableCell padding="checkbox" colSpan={3} className={classes.tableCell}>
        <div className={classes.description}>
          <Status status={status} />
          <div className={classes.content}>
            <Typography
              className={classes.bold}
              gutterBottom
              variant="subheading"
              color="secondary"
            >
              {content}
            </Typography>
            <div className={classes.footer}>
              <Button
                variant="outlined"
                color="primary"
                className={classes.footerButton}
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
                className={classes.footerButton}
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
          </div>
        </div>
      </TableCell>
      <TableCell
        colSpan={1}
        className={classNames(classes.tableCell, classes.vAlignTop)}
      >
        <div className={classes.tags}>
          {tags.map(
            (questionTag: Questions_questions_nodes_questionTags_nodes) =>
              questionTag.tag && (
                <Tag
                  key={`questionTag-${questionTag.id}`}
                  {...questionTag.tag}
                />
              )
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

const Row = RowBase;

export default Row;
