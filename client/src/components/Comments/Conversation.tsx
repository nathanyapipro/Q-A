import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import { compose } from "react-apollo";
import * as withCommentsQuery from "../../queries/withCommentsQuery";
import * as withCurrentUserQuery from "../../queries/withCurrentUserQuery";
import Comment from "./Comment";

interface OwnProps {}

type Props = OwnProps &
  withCommentsQuery.ChildProps &
  withCurrentUserQuery.ChildProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing.unit * 2,
    marginTop: -theme.spacing.unit / 2,
    marginBottom: -theme.spacing.unit / 2
  },
  emptyRow: {},
  bold: {
    fontWeight: 600
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
        <div className={classes.emptyRow}>
          <Typography
            className={classes.bold}
            variant="subtitle1"
            component="p"
            color="secondary"
          >
            No Comments found ...
          </Typography>
        </div>
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

const Conversation: React.ComponentType<
  OwnProps & withCommentsQuery.InputProps & withCurrentUserQuery.InputProps
> = compose(
  withCommentsQuery.hoc,
  withCurrentUserQuery.hoc
)(ConversationBase);

export default Conversation;
