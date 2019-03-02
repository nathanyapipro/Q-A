import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import CreateQuestionForm from "../../forms/CreateQuestion";
import * as withWorkspaceQuery from "../../queries/local/withWorkspaceQuery";
import { compose } from "react-apollo";

interface OwnProps {}

type Props = OwnProps & withWorkspaceQuery.ChildProps;

const useStyles = makeStyles((_: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  }
}));

function AskAQuestionBase(props: Props) {
  const classes = useStyles();

  const { workspaceId } = props;
  return (
    <div className={classes.container}>
      <CreateQuestionForm workspaceId={workspaceId} />
    </div>
  );
}

const AskAQuestion: React.ComponentType<
  OwnProps & withWorkspaceQuery.InputProps
> = compose(withWorkspaceQuery.hoc)(AskAQuestionBase);

export default AskAQuestion;
