import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { compose } from "react-apollo";
import * as withAnswersQuery from "../../queries/withAnswersQuery";
import * as withCurrentUserQuery from "../../queries/withCurrentUserQuery";
import Answer from "./Answer";
// import Paper from "@material-ui/core/Paper";

interface OwnProps {}

type Props = OwnProps &
  withAnswersQuery.ChildProps &
  withCurrentUserQuery.ChildProps;

const useStyles = makeStyles((_: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  }
}));

function ResponsesBase(props: Props) {
  const classes = useStyles();

  const {
    data: { nodes },
    currentUser
  } = props;

  if (!currentUser) {
    return <noscript />;
  }

  const { id: currentUserId } = currentUser;

  function renderAnswers() {
    if (nodes.length === 0) {
      return (
        <Typography variant="subtitle1" component="p">
          None
        </Typography>
      );
    } else {
      return nodes.map(data => (
        <Answer
          key={`answer-${data.id}`}
          data={data}
          currentUserId={currentUserId}
        />
      ));
    }
  }

  return <div className={classes.container}>{renderAnswers()}</div>;
}

const Responses: React.ComponentType<
  OwnProps & withAnswersQuery.InputProps & withCurrentUserQuery.InputProps
> = compose(
  withAnswersQuery.hoc,
  withCurrentUserQuery.hoc
)(ResponsesBase);

export default Responses;
