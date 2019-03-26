import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import { Questions_questions_nodes } from "../../types/apollo/Questions";
import { Theme } from "@material-ui/core/styles";
import Content from "../Question/Content";
import Actions from "../Question/Actions";
import Tags from "../Question/Tags";
import Status from "../Question/Status";
import { Link } from "react-router-dom";
interface OwnProps {
  data: Questions_questions_nodes;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[100]
    }
  },
  link: {
    padding: `${theme.spacing.unit * 2}px !important`,
    display: "flex",
    flexDirection: "column"
  },
  tableCell: {
    display: "flex",
    flexDirection: "column",
    padding: "0px !important"
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

function RowBase(props: Props) {
  const classes = useStyles();
  const { data } = props;

  const {
    id: questionId,
    content,

    createdAt
  } = data;

  const status = data.status && data.status.status;

  if (!status) {
    return <noscript />;
  }
  const commentCount =
    data.comments && data.comments.totalCount ? data.comments.totalCount : 0;
  const hasVoted = data.hasVoted ? data.hasVoted : false;
  const voteCount = data.voteCount ? data.voteCount : 0;
  const questionTags = data.questionTags.nodes;

  return (
    <TableRow className={classes.container} hover>
      <TableCell className={classes.tableCell}>
        <Link className={classes.link} to={`/questions/${questionId}`}>
          <div className={classes.status}>
            <Status status={status} />
          </div>
          <div className={classes.content}>
            <Content content={content} createdAt={createdAt} />
            <div className={classes.footer}>
              <Actions
                status={status}
                questionId={questionId}
                voteCount={voteCount}
                commentCount={commentCount}
                hasVoted={hasVoted}
              />
              <div className={classes.spacer} />
              <Tags questionTags={questionTags} />
            </div>
          </div>
        </Link>
      </TableCell>
    </TableRow>
  );
}

const Row = RowBase;

export default Row;
