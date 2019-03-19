import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import TagAutocomplete from "../components/Autocomplete/Tag";
import { Button } from "@material-ui/core";
import { compose } from "react-apollo";
import { FormFieldMeta } from "../types";
import Field from "../components/Field";
import * as withCreateQuestionMutation from "../queries/withCreateQuestionMutation";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { connect } from "react-redux";
import { StoreState } from "../states";

interface OwnProps {}

type ReduxStateProps = {
  workspaceId: number;
};

interface ReduxDispatchProps {}

type Props = OwnProps &
  ReduxStateProps &
  ReduxDispatchProps &
  withCreateQuestionMutation.ChildProps &
  RouteComponentProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column"
  },
  form: {
    display: "flex",
    flexDirection: "column",
    padding: theme.spacing.unit * 2
  },
  note: {
    marginBottom: theme.spacing.unit * 2
  },
  field: {
    marginTop: 0,
    marginBottom: 0
  },
  submitButton: {}
}));

function CreateQuestionBase(props: Props) {
  const { createQuestion, history, workspaceId } = props;
  const classes = useStyles();

  const [content, setContent] = React.useState<FormFieldMeta<string>>({
    value: "",
    touched: false,
    error: false
  });
  const [tagIds, setTagIds] = React.useState<FormFieldMeta<Array<number>>>({
    value: [],
    touched: false,
    error: false
  });

  function handleContentChange(e: React.ChangeEvent<HTMLTextAreaElement>) {
    const value = e.target.value;
    setContent({
      value,
      touched: true,
      error: !(value && value !== "")
    });
  }

  function handleSetTagIds(item: number | Array<number>) {
    const value = item instanceof Array ? item : [item];
    setTagIds({
      value,
      touched: true,
      error: !(value instanceof Array && value.length > 0)
    });
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!(content.error || tagIds.error)) {
      const response = await createQuestion({
        variables: {
          createQuestionInput: {
            content: content.value,
            tagIds: tagIds.value,
            workspaceId
          }
        }
      });
      if (
        response &&
        response.data &&
        response.data.createQuestion &&
        response.data.createQuestion.question
      ) {
        const { id } = response.data.createQuestion.question;
        history.push(`/questions/${id}`);
      }
    }
  }

  return (
    <Paper elevation={1} className={classes.container}>
      <form className={classes.form} onSubmit={handleSubmit}>
        <Typography variant="body2" className={classes.note}>
          Note: Questions posted here should promote open and transparent
          communication for all Elementals. Please be respectful of others and
          constructive when posting questions.
        </Typography>
        <Field
          label="Question"
          editComponent={
            <TextField
              fullWidth
              error={content.touched && content.error}
              autoFocus
              multiline
              rows="8"
              placeholder="Ask a Question ... "
              value={content.value}
              onChange={handleContentChange}
              className={classes.field}
              margin="dense"
              variant="outlined"
            />
          }
        />
        <Field
          label="Tags"
          editComponent={
            <TagAutocomplete
              workspaceId={workspaceId}
              onlyEnabled
              value={tagIds.value}
              error={tagIds.touched && tagIds.error}
              onChange={handleSetTagIds}
              isMulti={true}
            />
          }
        />
        <Button
          className={classes.submitButton}
          disabled={!(content.touched && tagIds.touched)}
          type="submit"
          variant="contained"
          color="primary"
        >
          Ask
        </Button>
      </form>
    </Paper>
  );
}

const mapStateToProps = (state: StoreState): ReduxStateProps => {
  return {
    workspaceId: state.global.workspaceId
  };
};

const CreateQuestion: React.ComponentType<
  OwnProps & withCreateQuestionMutation.InputProps
> = compose(
  withRouter,
  connect(
    mapStateToProps,
    {}
  ),
  withCreateQuestionMutation.hoc
)(CreateQuestionBase);

export default CreateQuestion;
