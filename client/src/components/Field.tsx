import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Create";
import Button from "@material-ui/core/Button";

interface OwnProps {
  label: string;
  staticComponent?: React.ReactElement<any>;
  editComponent?: React.ReactElement<any>;
}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexShrink: 0,
    flexDirection: "column",
    paddingBottom: theme.spacing.unit * 2,
    "&:last-child": {
      paddingBottom: 0
    }
  },
  header: {
    display: "flex",
    flexDirection: "row",
    color: "inherit"
  },
  label: {
    flexGrow: 1,
    pointerEvents: "none"
  },
  icon: {
    height: "16px",
    width: "16px",
    marginRight: theme.spacing.unit
  },
  button: {
    minHeight: "unset",
    padding: 0,
    marginLeft: theme.spacing.unit,
    textTransform: "unset"
  },
  content: {
    display: "flex",
    flexDirection: "column"
  }
}));

function FieldBase(props: Props) {
  const classes = useStyles();
  const { label, staticComponent: StaticComponent, editComponent } = props;

  const editable = Boolean(editComponent && StaticComponent);

  const [isEditing, setIsEditing] = React.useState<boolean>(!StaticComponent);

  const EditComponent = editComponent ? (
    editable ? (
      React.cloneElement(editComponent, { onExit: toggleEdit })
    ) : (
      editComponent
    )
  ) : (
    <noscript />
  );

  function toggleEdit() {
    setIsEditing(!isEditing);
  }

  function handleEditClick(_: React.MouseEvent) {
    if (editable && !isEditing) {
      toggleEdit();
    }
  }

  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <Typography
          className={classes.label}
          color="secondary"
          variant="caption"
        >
          {label}
        </Typography>
        {editComponent && !isEditing && (
          <Button
            variant="text"
            color="primary"
            onClick={handleEditClick}
            className={classes.button}
            size="small"
            disableFocusRipple
          >
            <EditIcon color="inherit" className={classes.icon} />
            Edit
          </Button>
        )}
      </div>
      <div className={classes.content}>
        {isEditing ? EditComponent : StaticComponent}
      </div>
    </div>
  );
}

const Field = FieldBase;

export default Field;
