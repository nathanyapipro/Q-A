import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import { Theme } from "@material-ui/core/styles";
import { compose } from "react-apollo";

interface OwnProps {}

type Props = OwnProps;

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    display: "flex",
    flexDirection: "row",
    flexGrow: 1
  },
  divider: {
    display: "flex",
    minHeight: "100%",
    borderLeft: `1px solid ${theme.palette.divider}`
  },
  userList: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "50%",
    flexGrow: 1,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  },
  userForm: {
    display: "flex",
    flexDirection: "column",
    flexBasis: "50%",
    flexGrow: 1,
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 3}px ${theme
      .spacing.unit * 3}px`
  }
}));

function UsersBase(_: Props) {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <div className={classes.userList}>UserList</div>
      <div className={classes.divider} />
      <div className={classes.userForm}>UserForm</div>
    </div>
  );
}

const Users: React.ComponentType<OwnProps> = compose()(UsersBase);

export default Users;
