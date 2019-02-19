import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as withCreateAnswerMutation from "../queries/withCreateAnswerMutation";
import { compose } from "react-apollo";
import { FormFieldMeta } from "../types";

interface OwnProps {
  questionId: number;
  onExit: () => void;
}

type Props = OwnProps & withCreateAnswerMutation.ChildProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    margin: `0px ${theme.spacing.unit}px`
  },
  field: {
    paddingBottom: theme.spacing.unit
  },
  button: {
    display: "none"
  }
}));

function CreateAnswerBase(props: Props) {
  const { questionId, createAnswer, onExit } = props;
  const classes = useStyles();

  const [content, setContent] = React.useState<FormFieldMeta<string>>({
    value: "",
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

  function handleKeyPress(e: React.KeyboardEvent) {
    const submitKeyPressed = e.key === "Enter" && !e.shiftKey;
    if (submitKeyPressed) {
      e.preventDefault();
      handleSubmit();
    }
  }

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault();
    if (!content.error) {
      const response = await createAnswer({
        variables: {
          createAnswerInput: {
            questionId,
            content: content.value
          }
        }
      });
      if (response && response.data && response.data.createAnswer) {
        onExit();
      }
    }
  }

  return (
    <form className={classes.container} onSubmit={handleSubmit}>
      <TextField
        className={classes.field}
        variant="outlined"
        fullWidth
        error={content.error}
        margin="dense"
        autoFocus
        multiline
        rowsMax="4"
        placeholder="Write an answer ... "
        onKeyPress={handleKeyPress}
        value={content.value}
        onChange={handleContentChange}
      />
      <button type="submit" className={classes.button} />
    </form>
  );
}

const CreateAnswer: React.ComponentType<
  OwnProps & withCreateAnswerMutation.InputProps
> = compose(withCreateAnswerMutation.hoc)(CreateAnswerBase);

export default CreateAnswer;
