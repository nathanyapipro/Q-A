import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

interface HeaderProps {}

type Props = HeaderProps;

const useStyles = makeStyles(_ => ({
  container: {}
}));

function HeaderBase(_: Props) {
  const classes = useStyles({});

  return (
    <TableHead className={classes.container}>
      <TableRow>
        <TableCell colSpan={3} />
        <TableCell colSpan={1}>TAGS</TableCell>
        <TableCell colSpan={1}>VOTES</TableCell>
      </TableRow>
    </TableHead>
  );
}

const Header = HeaderBase;

export default Header;
