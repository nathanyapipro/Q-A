import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { compose } from "react-apollo";
import * as withAnswersQuery from "../../queries/withAnswersQuery";
import Answer from "./Answer";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { CurrentUser } from "../../states/global/reducer";
import { $currentUser } from "../../states/global/selectors";

interface OwnProps {
  isAdding: boolean;
}

type ReduxStateProps = {
  currentUser: CurrentUser | undefined;
};

interface ReduxDispatchProps {}

type Props = OwnProps &
  withAnswersQuery.ChildProps &
  ReduxStateProps &
  ReduxDispatchProps;

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
            <Typography color="textPrimary" variant="body1" component="p">
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

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    currentUser: $currentUser(state)
  };
};

const Responses: React.ComponentType<
  OwnProps & withAnswersQuery.InputProps
> = compose(
  withAnswersQuery.hoc,
  connect(
    mapStateToProps,
    {}
  )
)(ResponsesBase);

export default Responses;
