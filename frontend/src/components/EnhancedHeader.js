import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import TableSortLabel from "@mui/material/TableSortLabel";
import { IconButton } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import { PurpleColour } from "./Colour";
import { ColumnFields } from "./ColumnFields";

const styles = {
  minWidth: 30,
  fontWeight: "bold",
  backgroundColor: PurpleColour,
  color: "#efeff6ff",
};

export default function EnhancedTableHead(props) {
  const { order, orderBy, onRequestSort, handleFilterIconClick } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        {ColumnFields.map((column) => (
          <TableCell
            key={column.id}
            align={column.align}
            style={{
              minWidth: column.minWidth,
              fontWeight: column.fontWeight,
              backgroundColor: column.backgroundColor,
              color: column.color,
            }}
          >
            {column.id === "DOC" ? (
              column.label
            ) : (
              <TableSortLabel
                active={orderBy === column.id}
                direction={orderBy === column.id ? order : "asc"}
                onClick={createSortHandler(column.id)}
              >
                {column.label}
              </TableSortLabel>
            )}
          </TableCell>
        ))}
        <TableCell key={"FILTER"} align={"center"} style={styles}>
          <IconButton
            color="inherit"
            aria-label="filterButton"
            onClick={handleFilterIconClick}
          >
            <FilterListIcon />
          </IconButton>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}
