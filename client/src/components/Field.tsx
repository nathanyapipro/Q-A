import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Create";

interface OwnProps {
  label: string;
  staticField?: React.ReactChild;
  inputField?: React.ReactChild;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    marginBottom: theme.spacing.unit * 2,
    "&:last-child": {
      marginBottom: 0
    },
    cursor: "pointer",
    "&:hover": {
      "&>$header": {
        "&>$editIcon": {
          color: theme.palette.primary.main
        }
      }
    }
  },
  header: {
    display: "flex",
    flexDirection: "row",
    color: "inherit"
  },
  label: {
    flexGrow: 1
  },
  editIcon: {
    alignSelf: "flex-start",
    height: "19px",
    width: "19px",
    color: theme.palette.secondary.main
  }
}));

function FieldBase(props: Props) {
  const classes = useStyles();
  const { label, staticField, inputField } = props;

  const [isEditing, setIsEditing] = React.useState<boolean>(!staticField);

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function handleSetEdit(_: React.MouseEvent<HTMLElement, MouseEvent>) {
    toggleEdit();
  }

  return (
    <div className={classes.container} onClick={handleSetEdit}>
      <div className={classes.header}>
        <Typography
          className={classes.label}
          color="secondary"
          variant="caption"
        >
          {label}
        </Typography>
        <EditIcon color="secondary" className={classes.editIcon} />
      </div>
      {isEditing ? inputField : staticField}
    </div>
  );
}

const Field = FieldBase;

export default Field;
