import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import {
  Questions_questions_nodes,
  Questions_questions_nodes_questionTags_nodes
} from "../../types/Questions";

interface RowProps {
  data: Questions_questions_nodes;
}

type Props = RowProps;

const useStyles = makeStyles(_ => ({
  tableRow: {}
}));

function RowBase(props: Props) {
  const classes = useStyles({});
  const { data } = props;

  const { content, votes, questionTags } = data;

  const voteCount = votes.totalCount;

  const tags = questionTags.nodes;

  return (
    <TableRow className={classes.tableRow}>
      <TableCell>{content}</TableCell>
      <TableCell>
        {tags.map(
          (questionTag: Questions_questions_nodes_questionTags_nodes) => {
            const tag = questionTag.tag;
            if (tag) {
              return <p>{tag.name}</p>;
            }
          }
        )}
      </TableCell>
      <TableCell>{voteCount}</TableCell>
    </TableRow>
  );
}

const Row = RowBase;

export default Row;
