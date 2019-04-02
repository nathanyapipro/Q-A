import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Questions_questions_nodes_questionTags_nodes } from "../../types/apollo/Questions";
import Tag from "../../components/Tag";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { compose } from "react-apollo";

interface OwnProps {
  questionTags: Array<Questions_questions_nodes_questionTags_nodes>;
}

type Props = OwnProps & RouteComponentProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexFlow: "row wrap",
    alignItems: "flex-start",
    margin: -theme.spacing.unit / 2,
    [theme.breakpoints.down("sm")]: {
      marginBottom: theme.spacing.unit
    }
  },
  empty: {
    margin: theme.spacing.unit / 2
  }
}));

function TagsBase(props: Props) {
  const classes = useStyles();

  const {
    questionTags,
    location: { pathname }
  } = props;

  const isQuestionByIdPage = pathname !== "/questions";

  function renderTags() {
    return questionTags.length > 0
      ? questionTags.map(
          (questionTag: Questions_questions_nodes_questionTags_nodes) =>
            questionTag.tag && (
              <Tag key={`questionTag-${questionTag.id}`} {...questionTag.tag} />
            )
        )
      : isQuestionByIdPage && (
          <Typography
            variant="body1"
            color="textPrimary"
            component="p"
            className={classes.empty}
          >
            None
          </Typography>
        );
  }

  return <div className={classes.container}>{renderTags()}</div>;
}

const Tags: React.ComponentType<OwnProps> = compose(withRouter)(TagsBase);

export default Tags;
