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
import { withRouter, RouteComponentProps } from "react-router-dom";

interface OwnProps {
  data: Questions_questions_nodes;
}

type Props = OwnProps & RouteComponentProps;

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

function RowBase(props: Props) {
  const classes = useStyles();
  const { data, history } = props;

  const {
    id,
    content,

    createdAt
  } = data;

  const status = data.status && data.status.name;

  if (!status) {
    return <noscript />;
  }
  const commentCount =
    data.comments && data.comments.totalCount ? data.comments.totalCount : 0;
  const hasVoted = data.hasVoted ? data.hasVoted : false;
  const voteCount = data.voteCount ? data.voteCount : 0;
  const questionTags = data.questionTags.nodes;

  function handleClick(_: React.MouseEvent<HTMLTableRowElement, MouseEvent>) {
    history.push(`/questions/${id}`);
  }

  return (
    <TableRow className={classes.container} hover onClick={handleClick}>
      <TableCell className={classes.tableCell}>
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
      </TableCell>
    </TableRow>
  );
}

const Row = withRouter(RowBase);

export default Row;
