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

interface RowProps {
  data: Questions_questions_nodes;
}

type Props = RowProps;

const useStyles = makeStyles(_ => ({
  container: {},
  tags: {
    display: "flex",
    flexFlow: "row wrap"
  }
}));

function RowBase(props: Props) {
  const classes = useStyles({});
  const { data } = props;

  const { content, votes, questionTags } = data;

  const voteCount = votes.totalCount;

  const tags = questionTags.nodes;

  return (
    <TableRow className={classes.container}>
      <TableCell colSpan={3}>
        <Typography component="p">{content}</Typography>
      </TableCell>
      <TableCell colSpan={1}>
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
      <TableCell colSpan={1}>
        <Typography>{voteCount}</Typography>
      </TableCell>
    </TableRow>
  );
}

const Row = RowBase;

export default Row;
