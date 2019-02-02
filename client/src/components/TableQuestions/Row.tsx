import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import {
  Questions_questions_nodes,
  Questions_questions_nodes_questionTags_nodes
} from "../../types/Questions";
import Tag from "../../components/Tag";
import Status from "../../components/Status";

interface RowProps {
  data: Questions_questions_nodes;
}

type Props = RowProps;

const useStyles = makeStyles(theme => ({
  container: {
    "&:nth-of-type(even)": {
      backgroundColor: theme.palette.grey[50]
    }
  },
  tags: {
    display: "flex",
    flexFlow: "row wrap"
  },
  tableCell: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2
  },
  content: {
    display: "flex",
    flexDirection: "row"
  },
  contentText: {
    fontWeight: 600
  }
}));

function RowBase(props: Props) {
  const classes = useStyles({});
  const { data } = props;

  const { content, votes, questionTags, status } = data;

  const voteCount = votes.totalCount;
  console.log(voteCount);

  const tags = questionTags.nodes;

  return (
    <TableRow className={classes.container}>
      <TableCell colSpan={3} className={classes.tableCell}>
        <div className={classes.content}>
          <Status status={status} />
          <Typography
            className={classes.contentText}
            variant="subheading"
            color="secondary"
          >
            {content}
          </Typography>
        </div>
      </TableCell>
      <TableCell colSpan={1} className={classes.tableCell}>
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
