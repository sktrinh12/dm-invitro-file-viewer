import { useEffect, useState } from "react";
import EnchancedTableHead from "./EnhancedHeader";
import ReadRow from "./ReadRow";
import React from "react";
import axios from "axios";
import { useSearchParams } from "react-router-dom";
import ReactLoading from "react-loading";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TablePagination from "@mui/material/TablePagination";
import Box from "@mui/material/Box";
import { sortedRowInformation, getComparator } from "./TableSortFunctions";
import { PurpleColour } from "./Colour";
import FilterTab from "./FilterTab";
// import TableCell from "@mui/material/TableCell";
// import TableRow from "@mui/material/TableRow";
// import { ColumnFields } from "./ColumnFields";

interface TableDataType {
  PID: number;
  EXPERIMENT_ID: number;
  ASSAY_TYPE: string;
  CRO: string;
  FILE_NAME: string;
}

export default function DisplayTable() {
  const { REACT_APP_BACKEND_URL } = process.env;
  const [tableData, setTableData] = useState([
    {
      ID: null,
      EXPERIMENT_ID: null,
      ASSAY_TYPE: null,
      CRO: null,
      FILE_NAME: null,
    },
  ]);
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(true);
  // const [columnLoading, setColumnLoading] = useState([]);
  // MUI TABLE
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [order, setOrder] = useState("asc");
  const [orderBy, setOrderBy] = useState("ID");
  const rootURL = `${REACT_APP_BACKEND_URL}/v1/fetch-mdata?compound_id=`;
  const [open, setOpen] = useState(false);

  const handleFilterIconClick = () => {
    setOpen(!open);
  };

  const axiosConfig = {
    withCredentials: false,
    headers: {
      "Content-Type": "application/json;charset=UTF-8",
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST",
    },
  };

  let ds = searchParams.get("ds");

  const fetchData = async () => {
    let newURL = [rootURL, searchParams.get("compound_id"), "&ds=", ds].join(
      ""
    );

    if (REACT_APP_BACKEND_URL.match(/localhost/g)) {
      console.log(`url: ${newURL}`);
    }

    await axios
      .get(newURL, axiosConfig)
      .then(async (res) => {
        const json = res.data;
        // console.log(json);
        if (res.status === 200) {
          setTableData(json);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log("AXIOS ERROR: ", err);
      });
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleSearchFilter = (field) => (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value === "") return items;
        else
          return items.filter((x) =>
            x[field].toLowerCase().startsWith(target.value.toLowerCase())
          );
      },
    });
  };

  return (
    <>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <ReactLoading
            type="spin"
            color={PurpleColour}
            height={667}
            width={375}
            margin="auto"
            padding="10px"
          />
        </Box>
      ) : (
        <Box sx={{ width: "100%" }}>
          <Paper sx={{ width: "100%", overflow: "hidden" }}>
            <TableContainer sx={{ maxHeight: 1000 }}>
              <FilterTab open={open} handleSearchFilter={handleSearchFilter} />
              <Table stickyHeader aria-label="sticky table">
                <EnchancedTableHead
                  order={order}
                  orderBy={orderBy}
                  onRequestSort={handleRequestSort}
                  handleFilterIconClick={handleFilterIconClick}
                />
                <TableBody>
                  {sortedRowInformation(
                    filterFn.fn(tableData),
                    getComparator(order, orderBy)
                  )
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((tdata: TableDataType, i: number) => (
                      <React.Fragment key={i}>
                        <ReadRow keyValue={tdata.PID} data={tdata} />
                      </React.Fragment>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[10, 25, 100]}
              component="div"
              count={tableData.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      )}
    </>
  );
}
