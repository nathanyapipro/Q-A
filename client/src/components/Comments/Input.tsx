import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import * as withCreateCommentMutation from "../../queries/withCreateCommentMutation";
import { compose } from "react-apollo";
import { FormFieldMeta } from "../../types";

interface OwnProps {
  questionId: number;
}

type Props = OwnProps & withCreateCommentMutation.ChildProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    borderTop: `1px solid ${theme.palette.divider}`,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("sm")]: {
      borderBottomLeftRadius: 0
    },
    backgroundColor: theme.palette.common.white
  },
  field: {
    marginTop: 0,
    marginBottom: 0
  },
  outlinedInputRoot: {
    position: "relative",
    "& $outlinedInputNotchedOutline": {
      borderColor: "transparent"
    }
  },
  outlinedInputNotchedOutline: {
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
    borderBottomLeftRadius: theme.shape.borderRadius,
    borderBottomRightRadius: theme.shape.borderRadius,
    [theme.breakpoints.up("sm")]: {
      borderBottomLeftRadius: 0
    },
    backgroundColor: theme.palette.common.white
  },
  button: {
    display: "none"
  }
}));

function InputBase(props: Props) {
  const { questionId, createComment } = props;
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
      const response = await createComment({
        variables: {
          createCommentInput: {
            questionId,
            content: content.value
          }
        }
      });
      if (response && response.data && response.data.createComment) {
        setContent({
          value: "",
          touched: false,
          error: false
        });
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
        multiline
        rowsMax="4"
        InputProps={{
          classes: {
            root: classes.outlinedInputRoot,
            notchedOutline: classes.outlinedInputNotchedOutline
          }
        }}
        placeholder="Write a comment ... "
        onKeyPress={handleKeyPress}
        value={content.value}
        onChange={handleContentChange}
      />
      <button type="submit" className={classes.button} />
    </form>
  );
}

const Input: React.ComponentType<
  OwnProps & withCreateCommentMutation.InputProps
> = compose(withCreateCommentMutation.hoc)(InputBase);

export default Input;
