import * as React from "react";
import { makeStyles } from "@material-ui/styles";
// import Typography from "@material-ui/core/Typography";
import { Theme } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import TextField from "@material-ui/core/TextField";
import TagsAutocomplete from "../../components/Autocomplete/Tags";

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
  field: {
    marginBottom: theme.spacing.unit * 2,
    "&:last-child": {
      marginBottom: "unset"
    }
  }
}));

function AskAQuestionBase(_: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Paper elevation={1}>
        <form className={classes.form}>
          <TextField
            fullWidth
            autoFocus
            required
            label="Content"
            multiline
            rows="8"
            placeholder="Ask a Question ... "
            InputLabelProps={{ shrink: true }}
            value={""}
            onChange={console.log}
            className={classes.field}
            margin="none"
            variant="outlined"
          />
          <div className={classes.field}>
            <TagsAutocomplete
              value={[]}
              label="Tags"
              onChange={console.log}
              isMulti={true}
            />
          </div>
        </form>
      </Paper>
    </div>
  );
}

const AskAQuestion = AskAQuestionBase;

export default AskAQuestion;
