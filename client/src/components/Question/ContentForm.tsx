import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { Theme } from "@material-ui/core/styles";
import { FormFieldMeta } from "../../types";

interface OwnProps {
  initialValue: string;
  onExit?: () => void;
}

type Props = OwnProps;

const useStyles = makeStyles((_: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column"
  },
  field: {
    marginTop: 0,
    marginBottom: 0
  },
  button: {
    display: "none"
  }
}));

function ContentFormBase(props: Props) {
  const classes = useStyles();

  const { initialValue, onExit } = props;

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

  function handleBlur(e: React.FormEvent<HTMLFormElement>) {
    handleSubmit(e);
  }

  async function handleSubmit(e?: React.FormEvent<HTMLFormElement>) {
    e && e.preventDefault();
    if (!content.error) {
      console.log("submited");
      if (onExit) {
        onExit();
      }
      // const response = await createComment({
      //   variables: {
      //     createCommentInput: {
      //       questionId,
      //       content: content.value
      //     }
      //   }
      // });
      // if (response && response.data && response.data.createComment) {
      //   setContent({
      //     value: "",
      //     touched: false,
      //     error: false
      //   });
      // }
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
        placeholder="Ask a Question ... "
        InputLabelProps={{ shrink: true }}
        value={content.value}
        onBlur={handleBlur}
        onChange={handleContentChange}
        onKeyPress={handleKeyPress}
        margin="dense"
        variant="outlined"
      />
      <button type="submit" className={classes.button} />
    </form>
  );
}

const ContentForm = ContentFormBase;

export default ContentForm;
