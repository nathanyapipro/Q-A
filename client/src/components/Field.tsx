import * as React from "react";
import classNames from "classnames";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import EditIcon from "@material-ui/icons/Create";

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
  editIcon: {
    alignSelf: "flex-end",
    height: "16px",
    width: "16px",
    color: theme.palette.primary.main,
    cursor: "pointer"
  },
  editable: {},
  content: {
    display: "flex",
    flexDirection: "column",
    "&$editable": {
      cursor: "pointer"
    }
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

  function handleSetEdit(_: React.MouseEvent) {
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
          <EditIcon
            color="secondary"
            className={classes.editIcon}
            onClick={handleSetEdit}
          />
        )}
      </div>
      <div
        className={classNames(classes.content, {
          [classes.editable]: !isEditing && editable
        })}
        onClick={handleSetEdit}
      >
        {isEditing ? EditComponent : StaticComponent}
      </div>
    </div>
  );
}

const Field = FieldBase;

export default Field;
