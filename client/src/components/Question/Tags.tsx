import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Questions_questions_nodes_questionTags_nodes } from "../../types/apollo/Questions";
import Tag from "../../components/Tag";
import { Theme } from "@material-ui/core/styles";

interface OwnProps {
  questionTags: Array<Questions_questions_nodes_questionTags_nodes>;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "flex-start",
    margin: -theme.spacing.unit / 2,
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing.unit
    }
  }
}));

function TagsBase(props: Props) {
  const classes = useStyles();

  const { questionTags } = props;

  function renderTags() {
    return questionTags.map(
      (questionTag: Questions_questions_nodes_questionTags_nodes) =>
        questionTag.tag && (
          <Tag key={`questionTag-${questionTag.id}`} {...questionTag.tag} />
        )
    );
  }

  return <div className={classes.container}>{renderTags()}</div>;
}

const Tags = TagsBase;

export default Tags;
