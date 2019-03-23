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
import classNames from "classnames";

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
  contentField: {
    marginTop: 0,
    marginBottom: -theme.spacing.unit * 2
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
      error: !(value && value !== "" && value.length <= 500)
    });
  }

  function handleSetTagIds(item: number | Array<number>) {
    const value = item instanceof Array ? item : [item];
    setTagIds({
      value,
      touched: true,
      error: false
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
        <Typography variant="body1" className={classes.note}>
          Tips for getting a satisfactory answer: (1) Do assume positive
          intentions first. We’re all building this company together! (2) Don’t
          assume anything else. Keep your question as precise and concise as
          possible. (3) One question per question! Don’t mix issues, please. (4)
          Compose your question by thinking about what a satisfactory answer
          would be. (5) And finally… reread yourself before hitting send,
          because once it’s submitted and upvoted, that’s it!
        </Typography>
        <Field
          label="Question"
          editComponent={
            <TextField
              fullWidth
              error={content.touched && content.error}
              autoFocus
              multiline
              rows="6"
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
              placeholder="Ask a Question ... "
              value={content.value}
              onChange={handleContentChange}
              className={classes.contentField}
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
          disabled={!content.touched}
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
