import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TagAutocomplete from "../components/Autocomplete/Tag";
import { Theme } from "@material-ui/core/styles";
import { FormFieldMeta } from "../types";
import { compose } from "react-apollo";
import * as withUpdateQuestionByIdMutation from "../queries/withUpdateQuestionByIdMutation";

interface OwnProps {
  questionId: number;
  initialValue: Array<number>;
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

function UpdateQuestionTagsBase(props: Props) {
  const classes = useStyles();

  const { questionId, initialValue, updateQuestion, onExit } = props;

  const [tagIds, setTagIds] = React.useState<FormFieldMeta<Array<number>>>({
    value: initialValue,
    touched: false,
    error: false
  });

  function handleSetTagIds(item: number | Array<number>) {
    const value = item instanceof Array ? item : [item];
    setTagIds({
      value,
      touched: true,
      error: !(value instanceof Array && value.length > 0)
    });
  }

  function handleKeyPress(e: React.KeyboardEvent) {
    const submitKeyPressed = e.key === "Enter" && !e.shiftKey;
    if (submitKeyPressed) {
      e.preventDefault();
      handleSubmit();
    }
  }

  async function handleSubmit(e?: React.FormEvent) {
    e && e.preventDefault();
    if (!tagIds.error) {
      if (tagIds.value !== initialValue) {
        const response = await updateQuestion({
          variables: {
            updateQuestionByIdInput: {
              id: questionId,
              patch: {
                tagIds: tagIds.value
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
      <TagAutocomplete
        autoFocus
        value={tagIds.value}
        error={tagIds.touched && tagIds.error}
        onChange={handleSetTagIds}
        onKeyDown={handleKeyPress}
        isMulti={true}
      />
      <button type="submit" className={classes.button} />
    </form>
  );
}

const UpdateQuestionTags: React.ComponentType<
  OwnProps & withUpdateQuestionByIdMutation.InputProps
> = compose(withUpdateQuestionByIdMutation.hoc)(UpdateQuestionTagsBase);

export default UpdateQuestionTags;
