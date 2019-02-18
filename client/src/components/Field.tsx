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
    },
    cursor: "default",
    "&$editable": {
      cursor: "pointer"
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
    color: theme.palette.primary.main
  },
  editable: {}
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

  function handleSetEdit(_: React.MouseEvent<HTMLElement, MouseEvent>) {
    if (editable && !isEditing) {
      toggleEdit();
    }
  }

  return (
    <div
      className={classNames(classes.container, {
        [classes.editable]: !isEditing && editable
      })}
      onClick={handleSetEdit}
    >
      <div className={classes.header}>
        <Typography
          className={classes.label}
          color="secondary"
          variant="caption"
        >
          {label}
        </Typography>
        {editComponent && !isEditing && (
          <EditIcon color="secondary" className={classes.editIcon} />
        )}
      </div>
      {isEditing ? EditComponent : StaticComponent}
    </div>
  );
}

const Field = FieldBase;

export default Field;
