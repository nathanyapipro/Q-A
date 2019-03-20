import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TextField from "@material-ui/core/TextField";
import { Theme } from "@material-ui/core/styles";
import { FormFieldMeta } from "../types";
import { compose } from "react-apollo";
import * as withUpdateQuestionByIdMutation from "../queries/withUpdateQuestionByIdMutation";
import classNames from "classnames";
import Typography from "@material-ui/core/Typography";

interface OwnProps {
  questionId: number;
  initialValue: string;
  onExit?: () => void;
}

type Props = OwnProps & withUpdateQuestionByIdMutation.ChildProps;

const useStyles = makeStyles((theme: Theme) => ({
  form: {
    display: "flex",
    flexDirection: "column"
  },
  field: {
    marginTop: 0,
    marginBottom: 0
  },
  helper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "flex-end",
    marginTop: -theme.spacing.unit,
    marginRight: -theme.spacing.unit * 1.5
  },
  helperText: {
    alignSelf: "flex-end"
  },
  error: {
    color: theme.palette.error.main
  },
  button: {
    display: "none"
  }
}));

function UpdateQuestionContentBase(props: Props) {
  const classes = useStyles();

  const { questionId, initialValue, updateQuestion, onExit } = props;

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
      error: !(value && value !== "" && value.length < 500)
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
        const response = await updateQuestion({
          variables: {
            updateQuestionByIdInput: {
              id: questionId,
              patch: {
                content: content.value
              }
            }
          }
        });
        if (response && response.data && response.data.updateQuestionById) {
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
        placeholder="Ask a Question ... "
        helperText={
          <div className={classes.helper}>
            <Typography
              variant="caption"
              color="secondary"
              className={classNames(classes.helperText, {
                [classes.error]: content.error
              })}
            >
              {`${content.value.length}/500`}
            </Typography>
          </div>
        }
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

const UpdateQuestionContent: React.ComponentType<
  OwnProps & withUpdateQuestionByIdMutation.InputProps
> = compose(withUpdateQuestionByIdMutation.hoc)(UpdateQuestionContentBase);

export default UpdateQuestionContent;
