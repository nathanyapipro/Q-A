import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
// import Paper from "@material-ui/core/Paper";
import { compose } from "react-apollo";
import * as withCommentsQuery from "../../queries/withCommentsQuery";

interface OwnProps {}

type Props = OwnProps & withCommentsQuery.ChildProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
    padding: theme.spacing.unit * 2
  }
}));

function ConversationBase(props: Props) {
  const classes = useStyles();

  const {
    data: { nodes }
  } = props;

  console.log(nodes);

  return <div className={classes.container}>Conversation</div>;
}

const Conversation: React.ComponentType<
  OwnProps & withCommentsQuery.InputProps
> = compose(withCommentsQuery.hoc)(ConversationBase);

export default Conversation;
