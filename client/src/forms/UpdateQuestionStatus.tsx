import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import StatusAutocomplete from "../components/Autocomplete/Status";
import { Theme } from "@material-ui/core/styles";
import { FormFieldMeta } from "../types";
import { compose } from "react-apollo";
import * as withUpdateQuestionByIdMutation from "../queries/withUpdateQuestionByIdMutation";

interface OwnProps {
  questionId: number;
  initialValue: number;
  onExit?: () => void;
}

type Props = OwnProps & withUpdateQuestionByIdMutation.ChildProps;

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

function UpdateQuestionStatusBase(props: Props) {
  const classes = useStyles();

  const { questionId, initialValue, updateQuestion, onExit } = props;

  const [statusId, setStatusId] = React.useState<FormFieldMeta<number>>({
    value: initialValue,
    touched: false,
    error: false
  });

  function handleSetStatusIds(item: number | Array<number>) {
    const value = item instanceof Array ? item[0] : item;
    setStatusId({
      value,
      touched: true,
      error: !value
    });
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    const submitKeyPressed = e.key === "Enter" && !e.shiftKey;
    if (submitKeyPressed) {
      e.preventDefault();
      handleSubmit();
    }
  }

  function handleBlur(e: React.FormEvent) {
    e.stopPropagation();
    handleSubmit(e);
  }

  async function handleSubmit(e?: React.FormEvent) {
    e && e.preventDefault();
    if (!statusId.error) {
      if (statusId.value !== initialValue) {
        const response = await updateQuestion({
          variables: {
            updateQuestionByIdInput: {
              id: questionId,
              patch: {
                statusId: statusId.value
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
      <StatusAutocomplete
        autoFocus
        value={statusId.value}
        error={statusId.touched && statusId.error}
        onChange={handleSetStatusIds}
        onKeyDown={handleKeyPress}
        onBlur={handleBlur}
        isMulti={false}
      />
      <button type="submit" className={classes.button} />
    </form>
  );
}

const UpdateQuestionStatus: React.ComponentType<
  OwnProps & withUpdateQuestionByIdMutation.InputProps
> = compose(withUpdateQuestionByIdMutation.hoc)(UpdateQuestionStatusBase);

export default UpdateQuestionStatus;
