import * as React from "react";
import { makeStyles } from "@material-ui/styles";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";

interface HeaderProps {}

type Props = HeaderProps;

const useStyles = makeStyles(_ => ({
  tableHead: {}
}));

function HeaderBase(_: Props) {
  const classes = useStyles({});

  return (
    <TableHead className={classes.tableHead}>
      <TableRow>
        <TableCell>CONTENT</TableCell>
        <TableCell>TAGS</TableCell>
        <TableCell>VOTES</TableCell>
      </TableRow>
    </TableHead>
  );
}

const Header = HeaderBase;

export default Header;
