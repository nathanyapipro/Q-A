import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { compose } from "react-apollo";
import * as withAnswersQuery from "../../queries/withAnswersQuery";
import * as withCurrentUserQuery from "../../queries/withCurrentUserQuery";
import Answer from "./Answer";
import Paper from "@material-ui/core/Paper";

interface OwnProps {
  isAdding: boolean;
}

type Props = OwnProps &
  withAnswersQuery.ChildProps &
  withCurrentUserQuery.ChildProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  noAnswers: {
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    padding: `${theme.spacing.unit / 2}px 0px`,
    margin: `0px ${theme.spacing.unit}px`
  },
  paper: {
    display: "flex",
    flexGrow: 1,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.grey[200],
    marginBottom: theme.spacing.unit / 4
  }
}));

function ResponsesBase(props: Props) {
  const classes = useStyles();

  const {
    data: { nodes },
    currentUser,
    isAdding
  } = props;

  if (!currentUser) {
    return <noscript />;
  }

  const { id: currentUserId } = currentUser;

  function renderAnswers() {
    if (nodes.length === 0 && !isAdding) {
      return (
        <div className={classes.noAnswers}>
          <Paper elevation={0} className={classes.paper}>
            <Typography variant="subtitle1" component="p">
              None
            </Typography>
          </Paper>
        </div>
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
