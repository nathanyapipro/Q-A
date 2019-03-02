import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { Theme } from "@material-ui/core/styles";
import { FormFieldMeta } from "../types";
import { compose } from "react-apollo";
import * as withUpdateAnswerByIdMutation from "../queries/withUpdateAnswerByIdMutation";

interface OwnProps {
  answerId: number;
  initialValue: string;
  onExit?: () => void;
}

type Props = OwnProps & withUpdateAnswerByIdMutation.ChildProps;

const useStyles = makeStyles((_: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1
  },
  field: {
    display: "flex",
    flexDirection: "column",
    marginTop: 0,
    marginBottom: 0
  },
  button: {
    display: "none"
  }
}));

function UpdateAnswerBase(props: Props) {
  const classes = useStyles();

  const { answerId, initialValue, updateAnswer, onExit } = props;

  const [content, setContent] = React.useState<FormFieldMeta<string>>({
    value: initialValue,
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
      if (content.value !== initialValue) {
        const response = await updateAnswer({
          variables: {
            updateAnswerByIdInput: {
              id: answerId,
              patch: {
                content: content.value
              }
            }
          }
        });
        if (response && response.data && response.data.updateAnswerById) {
          if (onExit) {
            onExit();
          }
        }
      } else {
        if (onExit) {
          onExit();
        }
      }
    }
  }

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <TextField
        className={classes.field}
        fullWidth
        error={content.touched && content.error}
        autoFocus
        multiline
        placeholder="Write a Answer ... "
        value={content.value}
        onChange={handleContentChange}
        onKeyPress={handleKeyPress}
        margin="dense"
        variant="outlined"
      />
      <button type="submit" className={classes.button} />
    </form>
  );
}

const UpdateAnswer: React.ComponentType<
  OwnProps & withUpdateAnswerByIdMutation.InputProps
> = compose(withUpdateAnswerByIdMutation.hoc)(UpdateAnswerBase);

export default UpdateAnswer;
