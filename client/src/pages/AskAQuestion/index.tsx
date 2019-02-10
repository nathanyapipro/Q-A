import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import TagsAutocomplete from "../../components/Autocomplete/Tags";
import { Button } from "@material-ui/core";

interface OwnProps {}

type Props = OwnProps;

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

interface FormErrors {
  [key: string]: boolean;
}

function AskAQuestionBase(_: Props) {
  const classes = useStyles();

  const [content, setContent] = React.useState<string>("");
  const [tagIds, setTagIds] = React.useState<Array<number>>([]);
  const [errors, setErrors] = React.useState<FormErrors>({
    content: false,
    tagIds: false
  });

  const isValid = Object.keys(errors)
    .map(key => errors[key])
    .every(error => error === false);

  function handleContentChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) {
    const value = e.target.value;
    setContent(value);
  }

  function handleSetTagIds(item: number | Array<number>) {
    const value = item instanceof Array ? item : [item];
    setTagIds(value);
  }

  function validate() {
    setErrors({
      content: !(content && content !== ""),
      tagIds: !(tagIds instanceof Array)
    });
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    validate();
    if (isValid) {
      console.log("NO ERRORS");
    } else {
      console.log("ERRORS");
    }
  }

  return (
    <div className={classes.container}>
      <Paper elevation={1}>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Typography variant="body2" className={classes.note}>
            Note: Questions posted here should promote open and transparent
            communication for all Elementals. Please be respectful of others and
            constructive when posting questions.
          </Typography>
          <TextField
            fullWidth
            error={errors.content}
            autoFocus
            label="Content"
            multiline
            rows="8"
            placeholder="Ask a Question ... "
            InputLabelProps={{ shrink: true }}
            value={content}
            onChange={handleContentChange}
            className={classes.field}
            margin="none"
            variant="outlined"
          />
          <div className={classes.field}>
            <TagsAutocomplete
              value={tagIds}
              label="Tags"
              onChange={handleSetTagIds}
              isMulti={true}
            />
          </div>
          <Button
            className={classes.submitButton}
            type="submit"
            variant="contained"
            color="primary"
          >
            Ask
          </Button>
        </form>
      </Paper>
    </div>
  );
}

const AskAQuestion = AskAQuestionBase;

export default AskAQuestion;
