import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { compose } from "react-apollo";
import * as withCommentsQuery from "../../queries/withCommentsQuery";
import Comment from "./Comment";
import Paper from "@material-ui/core/Paper";
import { connect } from "react-redux";
import { StoreState } from "../../states";
import { CurrentUser } from "../../states/global/reducer";
import { $currentUser } from "../../states/global/selectors";

interface OwnProps {}

type ReduxStateProps = {
  currentUser: CurrentUser | undefined;
};

interface ReduxDispatchProps {}

type Props = OwnProps &
  withCommentsQuery.ChildProps &
  ReduxStateProps &
  ReduxDispatchProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: `${theme.spacing.unit * 2}px 0px`,
    [theme.breakpoints.up("sm")]: {
      maxHeight: `calc(100vh - ${theme.mixins.toolbar.minHeight}px - ${theme
        .spacing.unit * 4}px - 56px)`,
      overflowY: "auto"
    }
  },
  none: {
    display: "flex",
    margin: `0px ${theme.spacing.unit * 2}px`,
    padding: theme.spacing.unit,
    backgroundColor: theme.palette.grey[200]
  }
}));

function ConversationBase(props: Props) {
  const classes = useStyles();

  const {
    data: { nodes },
    currentUser
  } = props;

  if (!currentUser) {
    return <noscript />;
  }

  const { id: currentUserId } = currentUser;

  function renderComments() {
    if (nodes.length === 0) {
      return (
        <Paper elevation={0} className={classes.none}>
          <Typography variant="subtitle1" component="p">
            No Comments found ...
          </Typography>
        </Paper>
      );
    } else {
      return nodes.map(data => (
        <Comment
          key={`comment-${data.id}`}
          data={data}
          currentUserId={currentUserId}
        />
      ));
    }
  }

  return <div className={classes.container}>{renderComments()}</div>;
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    currentUser: $currentUser(state)
  };
};

const Conversation: React.ComponentType<
  OwnProps & withCommentsQuery.InputProps
> = compose(
  withCommentsQuery.hoc,
  connect(
    mapStateToProps,
    {}
  )
)(ConversationBase);

export default Conversation;
