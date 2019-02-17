import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import TagAutocomplete from "../../components/Autocomplete/Tag";
import { Button } from "@material-ui/core";
import { compose } from "react-apollo";
import * as withCreateQuestionMutation from "../../queries/withCreateQuestionMutation";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { FormFieldMeta } from "../../types";

interface OwnProps {}

type Props = OwnProps &
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
    marginBottom: theme.spacing.unit * 2,
    "&:last-child": {
      marginBottom: "unset"
    }
  },
  submitButton: {}
}));

function CreateQuestionFormBase(props: Props) {
  const { createQuestion, history } = props;
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
            tagIds: tagIds.value
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
        <TextField
          fullWidth
          error={content.touched && content.error}
          autoFocus
          label="Question"
          multiline
          rows="8"
          placeholder="Ask a Question ... "
          InputLabelProps={{ shrink: true }}
          value={content.value}
          onChange={handleContentChange}
          className={classes.field}
          margin="none"
          variant="outlined"
        />
        <div className={classes.field}>
          <TagAutocomplete
            value={tagIds.value}
            error={tagIds.touched && tagIds.error}
            label="Tags"
            onChange={handleSetTagIds}
            isMulti={true}
          />
        </div>
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

const ComposedCreateQuestionForm: React.ComponentType<
  OwnProps & RouteComponentProps & withCreateQuestionMutation.InputProps
> = compose(withCreateQuestionMutation.hoc)(CreateQuestionFormBase);

const CreateQuestionFrom = withRouter(ComposedCreateQuestionForm);

export default CreateQuestionFrom;
