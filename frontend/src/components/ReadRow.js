import * as React from "react";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import { ColumnFields } from "./ColumnFields";
import PowerpointIcon from "./PowerpointIcon";
import ExcelIcon from "./ExcelIcon";
import TextIcon from "./TextIcon";
import PDFIcon from "./PDFIcon";

const { REACT_APP_BACKEND_URL } = process.env;

const ReadRow = ({ keyValue, data }) => {
  return (
    <TableRow hover role="checkbox" tabIndex={-1}>
      {ColumnFields.map((column, i) => {
        const value = data[column.id];
        const fileURL = [
          REACT_APP_BACKEND_URL,
          "/v1/fetch-file?doc_id=",
          data.DOC_ID,
          "&file_name=",
          data.FILE_NAME,
          "&id=",
          data.EXPERIMENT_ID,
        ].join("");
        // console.log(`file url: ${fileURL}`);
        return (
          <TableCell align={column.align} key={`${keyValue}-${i}`}>
            {column.id === "DOC" ? (
              <a href={fileURL}>
                {/xls.*/.test(data.EXTENSION) ? (
                  <ExcelIcon className="svg-icon"/>
                ) : /ppt.*/.test(data.EXTENSION) ? (
                  <PowerpointIcon className="svg-icon"/>
                ) : data.EXTENSION === "pdf" ? (
                  <PDFIcon className="svg-icon"/>
                ) : (
                  <TextIcon className="svg-icon"/>
                )}
              </a>
            ) : (
              value
            )}
          </TableCell>
        );
      })}
    </TableRow>
  );
};

export default ReadRow;
